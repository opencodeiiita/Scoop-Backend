import News from "../models/news.model.js";
import {response_200 ,response_404, response_500} from "../utils/responseCodes.js";

export async function getnews(req, res){
    try {
        const news = await News.find().sort({ createdAt: -1 });

        if (!news) {
            return response_404(res, "News not found");
        }

        // res.status(200).json({ news });
        return response_200(res, "latest News", { news });
    } catch (error) {
        console.error('Error fetching latest news:', error);
        return response_500(res, "Internal server error");
    }
}

