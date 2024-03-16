import { Router } from "express";
import * as ProductsCtrl from "../controllers/products.controller"
import { authjwt, duplicateP, authLimiter } from "../middlewares";


const router = Router();


router.get("/",  authLimiter.getsLimit,  ProductsCtrl.getProducts );
router.get("/:productId",authLimiter.getsLimit,  ProductsCtrl.getProductById);

router.post("/",[authjwt.verifyToken,
                 authLimiter.amountLimit ,
                 authjwt.isAdmin,
                 duplicateP.validateFields,
                  duplicateP.verifyDuplicate
                ], ProductsCtrl.createProduct);

router.put("/:productId", [authjwt.verifyToken,
                             authLimiter.amountLimit ,
                             authjwt.isAdmin, 
                            duplicateP.validateFields],  ProductsCtrl.updateProducById);
                            
router.delete("/:productId", [authjwt.verifyToken, authLimiter.amountLimit,  authjwt.isAdmin],  ProductsCtrl.deleteProductsById);



export default router;