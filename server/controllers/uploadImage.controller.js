export async function uploadImageController(req, res) {
    try {

        const file = req.file

        console.log(file)
        return res.json({
            message: "Operation successful",
            error: false,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}