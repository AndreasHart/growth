package main

import (
	"github.com/andreashart/growth/server/model"
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
	"net/http"
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

func errToStatusCode(err error) int {
	switch err {
	case gorm.ErrRecordNotFound:
		return http.StatusNotFound
	default:
		return http.StatusInternalServerError
	}
}
