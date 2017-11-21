package main

import (
	"fmt"
	"github.com/andreashart/growth/server/model"
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"strconv"
	"time"
)

// API is a defined as struct bundle
// for api. Feel free to organize
// your app as you wish.
type API struct {
	db *gorm.DB
}

func NewServer(db *gorm.DB) *API {
	return &API{db: db}
}

// Bind attaches api routes
func (api *API) Bind(group *echo.Group) {
	group.GET("/v1/conf", api.ConfHandler)
	group.GET("/v2/conf", api.ConfHandler)

	group.GET("/customer", api.getCustomers)
	group.POST("/customer", api.createCustomer)
	group.GET("/customer/:customerID", api.getCustomer)
	group.PUT("/customer/:customerID", api.updateCustomer)
	group.DELETE("/customer/:customerID", api.deleteCustomer)

	group.POST("/login", api.login)
	group.GET("/session", api.session)
	group.DELETE("/logout", api.logout)
	group.GET("/user", api.getUsers)
	group.POST("/user", api.createUser)
	group.POST("/userad", api.createAdvertiser)
	group.GET("/user/:userID", api.getUser)
	group.PUT("/user/:userID", api.updateUser)
	group.DELETE("/user/:userID", api.deleteUser)

	group.GET("/product", api.getProducts)
	group.POST("/product", api.createProduct)
	group.GET("/product/:productID", api.getProduct)
	group.PUT("/product/:productID", api.updateProduct)
	group.DELETE("/product/:productID", api.deleteProduct)

	group.GET("/order", api.getOrders)
	group.POST("/order", api.createOrder)
	group.GET("/order/:orderID", api.getOrder)
	group.PUT("/order/:orderID", api.updateOrder)
	group.DELETE("/order/:orderID", api.deleteOrder)
	group.POST("/order/:orderID/product", api.addProductToOrder)

	group.GET("/blog", api.getBlogPosts)
	group.POST("/blog", api.createBlogPost)
	group.GET("/blog/:orderID", api.getBlogPost)
	group.PUT("/blog/:orderID", api.updateBlogPost)
	group.DELETE("/blog/:orderID", api.deleteBlogPost)
}

// ConfHandler handle the app config, for example
func (api *API) ConfHandler(c echo.Context) error {
	app := c.Get("app").(*App)
	return c.JSON(200, app.Conf.Root)
}

func (api *API) getCustomers(c echo.Context) error {
	var customers []model.Customer
	if err := api.db.Find(&customers).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, customers)
	}
}

func (api *API) createCustomer(c echo.Context) (err error) {
	var customers *model.Customer = new(model.Customer)
	if err := c.Bind(customers); err != nil {
		return err
	}
	if err := api.db.Create(&customers).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, customers)
	}

}

func (api *API) getCustomer(c echo.Context) (err error) {
	var customer model.Customer
	if err := api.db.Find(&customer, c.Param("customerID")).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, customer)
	}
}

func (api *API) updateCustomer(c echo.Context) (err error) {
	var customer *model.Customer = new(model.Customer)
	if err := c.Bind(customer); err != nil {
		return err
	}

	customerID := c.Param("customerID")
	if err := api.db.Model(&customer).Where("ID = ?", customerID).Update(customer).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, customer)
	}
}

func (api *API) deleteCustomer(c echo.Context) (err error) {
	customerID := c.Param("customerID")
	req := api.db.Delete(model.Customer{}, "ID = ?", customerID)
	if err := req.Error; err != nil {
		return err
	} else if req.RowsAffected == 0 {
		return err
	} else {
		return c.JSON(http.StatusOK, customerID)
	}
}

func (api *API) logout(c echo.Context) error {
	// TODO delete session
	cookie := new(http.Cookie)
	cookie.Name = "ID"
	cookie.Value = ""
	cookie.Expires = time.Now()
	c.SetCookie(cookie)
	return c.String(http.StatusOK, "Successfull logged out")
}

func (api *API) getUsers(c echo.Context) error {
	cookie, err := c.Cookie("ID")
	if err != nil {
		return err
	}
	fmt.Println(cookie.Name)
	fmt.Println(cookie.Value)
	var users []model.User
	if err := api.db.Find(&users).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, users)
	}
}

func (api *API) createUser(c echo.Context) (err error) {

	type InitialUser struct {
		Name     *string `json:"name" gorm:"not null" query:"name"`
		Email    *string `json:"email" gorm:"not null" query:"email" valid:"email"`
		Password *string `json:"password" gorm:"not null"`
	}
	u := new(InitialUser)
	if err = c.Bind(u); err != nil {
		return err
	}
	password := []byte(*u.Password)
	hash, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	roles := "user"
	posts := new([]model.BlogPost)
	users := model.User{0, u.Name, u.Email, hash, &roles, *posts}

	if err := api.db.Create(&users).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, users)
	}

}

func (api *API) createAdvertiser(c echo.Context) (err error) {

	type InitialUser struct {
		Name     *string `json:"name" gorm:"not null" query:"name"`
		Business *string `json:"business" gorm:"not null" query:"name"`
		Email    *string `json:"email" gorm:"not null" query:"email" valid:"email"`
		Password *string `json:"password" gorm:"not null"`
	}
	u := new(InitialUser)
	if err = c.Bind(u); err != nil {
		return err
	}
	password := []byte(*u.Password)
	hash, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	roles := "Advertiser"
	posts := new([]model.BlogPost)
	users := model.User{0, u.Name, u.Email, hash, &roles, *posts}

	if err := api.db.Create(&users).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, users)
	}

}

func (api *API) login(c echo.Context) (err error) {
	var user model.User
	type LogInAtempt struct {
		Email    *string `json:"email" gorm:"not null" query:"email"`
		Password *string `json:"password" gorm:"not null"`
	}
	u := new(LogInAtempt)
	if err = c.Bind(u); err != nil {
		return err
	}

	if err := api.db.Where("email = ?", *u.Email).Find(&user).Error; err != nil {
		return err
	} else {
		password := []byte(*u.Password)
		println("%v passowrd", password)
		if err := bcrypt.CompareHashAndPassword(user.Hash, password); err != nil {
			return err
		} else {
			cookie := new(http.Cookie)
			cookie.Name = "ID"
			cookie.Value = strconv.Itoa(user.ID)
			cookie.Expires = time.Now().Add(24 * time.Hour)
			c.SetCookie(cookie)
			type Data struct {
				ID    int
				Roles *string
			}
			d := Data{user.ID, user.Roles}
			return c.JSON(http.StatusOK, d)
		}

	}
}
func (api *API) session(c echo.Context) (err error) {
	cookie, _ := c.Cookie("ID")
	if cookie != nil {
		return c.String(http.StatusOK, "Session Still gooood")
	} else {
		return c.String(http.StatusUnauthorized, "need to log in again")
	}

}
func (api *API) getUser(c echo.Context) (err error) {
	var user model.User
	if err := api.db.Find(&user, c.Param("userID")).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, user)
	}
}

func (api *API) updateUser(c echo.Context) (err error) {
	var user *model.User = new(model.User)
	if err := c.Bind(user); err != nil {
		return err
	}

	userID := c.Param("userID")
	if err := api.db.Model(&user).Where("ID = ?", userID).Update(user).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, user)
	}
}

func (api *API) deleteUser(c echo.Context) (err error) {
	userID := c.Param("userID")
	req := api.db.Delete(model.User{}, "ID = ?", userID)
	if err := req.Error; err != nil {
		return err
	} else if req.RowsAffected == 0 {
		return err
	} else {
		return c.JSON(http.StatusOK, userID)
	}
}
func (api *API) getProducts(c echo.Context) error {
	var products []model.Product
	if err := api.db.Find(&products).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, products)
	}
}

func (api *API) createProduct(c echo.Context) (err error) {
	var products *model.Product = new(model.Product)
	if err := c.Bind(products); err != nil {
		return err
	}
	if err := api.db.Create(&products).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, products)
	}

}

func (api *API) getProduct(c echo.Context) (err error) {
	var product model.Product
	if err := api.db.Find(&product, c.Param("customerID")).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, product)
	}
}

func (api *API) updateProduct(c echo.Context) (err error) {
	var product *model.Product = new(model.Product)
	if err := c.Bind(product); err != nil {
		return err
	}

	productID := c.Param("productID")
	if err := api.db.Model(&product).Where("ID = ?", productID).Update(product).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, product)
	}
}

func (api *API) deleteProduct(c echo.Context) (err error) {
	productID := c.Param("productID")
	req := api.db.Delete(model.Product{}, "ID = ?", productID)
	if err := req.Error; err != nil {
		return err
	} else if req.RowsAffected == 0 {
		return err
	} else {
		return c.JSON(http.StatusOK, productID)
	}
}

func (api *API) getOrders(c echo.Context) error {
	var orders []model.Order
	if err := api.db.Find(&orders).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, orders)
	}
}

func (api *API) createOrder(c echo.Context) (err error) {
	var orders *model.Order = new(model.Order)
	if err := c.Bind(orders); err != nil {
		return err
	}
	if err := api.db.Create(&orders).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, orders)
	}

}

func (api *API) getOrder(c echo.Context) (err error) {
	var order model.Order
	if err := api.db.Find(&order, c.Param("customerID")).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, order)
	}
}

func (api *API) updateOrder(c echo.Context) (err error) {
	var order *model.Order = new(model.Order)
	if err := c.Bind(order); err != nil {
		return err
	}

	orderID := c.Param("orderID")
	if err := api.db.Model(&order).Where("ID = ?", orderID).Update(order).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, order)
	}
}

func (api *API) deleteOrder(c echo.Context) (err error) {
	orderID := c.Param("orderID")
	req := api.db.Delete(model.Order{}, "ID = ?", orderID)
	if err := req.Error; err != nil {
		return err
	} else if req.RowsAffected == 0 {
		return err
	} else {
		return c.JSON(http.StatusOK, orderID)
	}
}

func (api *API) addProductToOrder(c echo.Context) (err error) {
	tx := api.db.Begin()

	var order model.Order
	orderID := c.Param("orderID")
	if err := tx.Preload("Products").First(&order, orderID).Error; err != nil {
		tx.Rollback()
		return err
	}

	const productIDParam = "productID"
	productID := c.QueryParam(productIDParam)
	if productID == "" {
		tx.Rollback()
		return err
	}

	var addedProduct model.Product
	if err := tx.First(&addedProduct, productID).Error; err != nil {
		tx.Rollback()
		return err
	}

	order.Products = append(order.Products, addedProduct)
	if err := tx.Save(&order).Error; err != nil {
		tx.Rollback()
		return err
	}

	if err := tx.Commit().Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, order)
	}
}

func (api *API) getBlogPosts(c echo.Context) error {
	var blogPosts []model.BlogPost
	if err := api.db.Find(&blogPosts).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, blogPosts)
	}
}

func (api *API) createBlogPost(c echo.Context) (err error) {
	var blogPosts *model.BlogPost = new(model.BlogPost)
	if err := c.Bind(blogPosts); err != nil {
		return err
	}
	if err := api.db.Create(&blogPosts).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, blogPosts)
	}

}

func (api *API) getBlogPost(c echo.Context) (err error) {
	var blogPost model.BlogPost
	if err := api.db.Find(&blogPost, c.Param("blogPostID")).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, blogPost)
	}
}

func (api *API) updateBlogPost(c echo.Context) (err error) {
	var blogPost *model.BlogPost = new(model.BlogPost)
	if err := c.Bind(blogPost); err != nil {
		return err
	}

	blogPostID := c.Param("blogPostID")
	if err := api.db.Model(&blogPost).Where("ID = ?", blogPostID).Update(blogPost).Error; err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, blogPost)
	}
}

func (api *API) deleteBlogPost(c echo.Context) (err error) {
	blogPostID := c.Param("blogPostID")
	req := api.db.Delete(model.BlogPost{}, "ID = ?", blogPostID)
	if err := req.Error; err != nil {
		return err
	} else if req.RowsAffected == 0 {
		return err
	} else {
		return c.JSON(http.StatusOK, blogPostID)
	}
}

func errToStatusCode(err error) int {
	switch err {
	case gorm.ErrRecordNotFound:
		return http.StatusNotFound
	default:
		return http.StatusInternalServerError
	}
}
