package main

import (
	"github.com/andreashart/newgrow/server/model"
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

	// group.GET("/product", api.getProducts)
	// group.POST("/product", api.createProduct)
	// group.GET("/product/:productID", api.getProduct)
	// group.PUT("/product/:productID", api.updateProduct)
	// group.DELETE("/product/:productID", api.deleteProduct)

	// group.GET("/order", api.getOrders)
	// group.POST("/order", api.createOrder)
	// group.GET("/order/:orderID", api.getOrder)
	// group.PUT("/order/:orderID", api.updateOrder)
	// group.DELETE("/order/:orderID", api.deleteOrder)
	// group.POST("/order/:orderID/product", api.addProductToOrder)
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

// func (s *API) getProducts(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
// 	var products []model.Product
// 	if err := s.db.Find(&products).Error; err != nil {
// 		http.Error(w, err.Error(), errToStatusCode(err))
// 	} else {
// 		writeJSONResult(w, products)
// 	}
// }

// func (s *API) createProduct(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
// 	var product model.Product
// 	if err := json.NewDecoder(r.Body).Decode(&product); err != nil {
// 		http.Error(w, err.Error(), errToStatusCode(err))
// 		return
// 	}

// 	if err := s.db.Create(&product).Error; err != nil {
// 		http.Error(w, err.Error(), errToStatusCode(err))
// 	} else {
// 		writeJSONResult(w, product)
// 	}
// }

// func (s *API) getProduct(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
// 	var product model.Product
// 	if err := s.db.Find(&product, ps.ByName("productID")).Error; err != nil {
// 		http.Error(w, err.Error(), errToStatusCode(err))
// 	} else {
// 		writeJSONResult(w, product)
// 	}
// }

// func (s *API) updateProduct(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
// 	var product model.Product
// 	if err := json.NewDecoder(r.Body).Decode(&product); err != nil {
// 		http.Error(w, err.Error(), errToStatusCode(err))
// 		return
// 	}

// 	productID := ps.ByName("productID")
// 	if err := s.db.Model(&product).Where("ID = ?", productID).Update(product).Error; err != nil {
// 		http.Error(w, err.Error(), errToStatusCode(err))
// 	} else {
// 		writeJSONResult(w, product)
// 	}
// }

// func (s *API) deleteProduct(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
// 	productID := ps.ByName("productID")
// 	req := s.db.Delete(model.Product{}, "ID = ?", productID)
// 	if err := req.Error; err != nil {
// 		http.Error(w, err.Error(), errToStatusCode(err))
// 	} else if req.RowsAffected == 0 {
// 		http.Error(w, "", http.StatusNotFound)
// 	} else {
// 		writeTextResult(w, "ok")
// 	}
// }

// func (s *API) getOrders(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
// 	var orders []model.Order
// 	if err := s.db.Preload("Customer").Preload("Products").Find(&orders).Error; err != nil {
// 		http.Error(w, err.Error(), errToStatusCode(err))
// 	} else {
// 		writeJSONResult(w, orders)
// 	}
// }

// func (s *API) createOrder(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
// 	var order model.Order
// 	if err := json.NewDecoder(r.Body).Decode(&order); err != nil {
// 		http.Error(w, err.Error(), errToStatusCode(err))
// 		return
// 	}

// 	if order.Customer.ID == 0 {
// 		http.Error(w, "must specify user", http.StatusBadRequest)
// 		return
// 	}
// 	if err := s.db.Find(&order.Customer, order.Customer.ID).Error; err != nil {
// 		http.Error(w, err.Error(), errToStatusCode(err))
// 		return
// 	}

// 	for i, product := range order.Products {
// 		if product.ID == 0 {
// 			http.Error(w, "must specify a product ID", http.StatusBadRequest)
// 			return
// 		}
// 		if err := s.db.Find(&order.Products[i], product.ID).Error; err != nil {
// 			http.Error(w, err.Error(), errToStatusCode(err))
// 			return
// 		}
// 	}

// 	if err := s.db.Create(&order).Error; err != nil {
// 		http.Error(w, err.Error(), errToStatusCode(err))
// 	} else {
// 		writeJSONResult(w, order)
// 	}
// }

// func (s *API) getOrder(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
// 	var order model.Order
// 	if err := s.db.Preload("Customer").Preload("Products").Find(&order, ps.ByName("orderID")).Error; err != nil {
// 		http.Error(w, err.Error(), errToStatusCode(err))
// 	} else {
// 		writeJSONResult(w, order)
// 	}
// }

// func (s *API) updateOrder(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
// 	var order model.Order
// 	if err := json.NewDecoder(r.Body).Decode(&order); err != nil {
// 		http.Error(w, err.Error(), errToStatusCode(err))
// 		return
// 	}

// 	orderID := ps.ByName("orderID")
// 	if err := s.db.Model(&order).Where("ID = ?", orderID).Update(order).Error; err != nil {
// 		http.Error(w, err.Error(), errToStatusCode(err))
// 	} else {
// 		writeJSONResult(w, order)
// 	}
// }

// func (s *API) deleteOrder(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
// 	orderID := ps.ByName("orderID")
// 	req := s.db.Delete(model.Order{}, "ID = ?", orderID)
// 	if err := req.Error; err != nil {
// 		http.Error(w, err.Error(), errToStatusCode(err))
// 	} else if req.RowsAffected == 0 {
// 		http.Error(w, "", http.StatusNotFound)
// 	} else {
// 		writeTextResult(w, "ok")
// 	}
// }

// func (s *API) addProductToOrder(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
// 	tx := s.db.Begin()

// 	var order model.Order
// 	orderID := ps.ByName("orderID")
// 	if err := tx.Preload("Products").First(&order, orderID).Error; err != nil {
// 		tx.Rollback()
// 		http.Error(w, err.Error(), errToStatusCode(err))
// 		return
// 	}

// 	const productIDParam = "productID"
// 	productID := r.URL.Query().Get(productIDParam)
// 	if productID == "" {
// 		tx.Rollback()
// 		writeMissingParamError(w, productIDParam)
// 		return
// 	}

// 	var addedProduct model.Product
// 	if err := tx.First(&addedProduct, productID).Error; err != nil {
// 		tx.Rollback()
// 		http.Error(w, err.Error(), errToStatusCode(err))
// 		return
// 	}

// 	order.Products = append(order.Products, addedProduct)
// 	if err := tx.Save(&order).Error; err != nil {
// 		tx.Rollback()
// 		http.Error(w, err.Error(), errToStatusCode(err))
// 		return
// 	}

// 	if err := tx.Commit().Error; err != nil {
// 		http.Error(w, err.Error(), errToStatusCode(err))
// 	} else {
// 		writeJSONResult(w, order)
// 	}
// }

// func writeTextResult(w http.ResponseWriter, res string) {
// 	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
// 	w.WriteHeader(http.StatusOK)
// 	fmt.Fprintln(w, res)
// }

// func writeJSONResult(w http.ResponseWriter, res interface{}) {
// 	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
// 	w.WriteHeader(http.StatusOK)
// 	if err := json.NewEncoder(w).Encode(res); err != nil {
// 		panic(err)
// 	}
// }

// func writeMissingParamError(w http.ResponseWriter, paramName string) {
// 	http.Error(w, fmt.Sprintf("missing query param %q", paramName), http.StatusBadRequest)
// }

func errToStatusCode(err error) int {
	switch err {
	case gorm.ErrRecordNotFound:
		return http.StatusNotFound
	default:
		return http.StatusInternalServerError
	}
}
