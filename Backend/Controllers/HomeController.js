
export const homePage = async(req, res) =>{
    try{
        res.status(200).json({
            message: "Welcome to the home page!",
            success: true,
        })
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error!",
            success: false,
        })
    }
}

