import { useJsonData } from "store/use-json-data";
import { Card, CardContent } from "./ui/card";

function TemplateCard({ url , jsonURL, json}){
    const { setData } = useJsonData();
    async function ParseJson(jsonURL){
        await fetch(jsonURL).then(response => response.json()).then(data => setData(data));
        window.location.href = `/canvas?json=TRUE`;
    }
    function setJSON(json){
        setData(json);
        window.location.href = `/canvas?json=TRUE`;
    }
    return (
        json ? 
        <button onClick={() => setJSON(json)}>
            <Card className=" overflow-hidden min-w-28 max-w-40">
                <CardContent className="p-0">
                    <img src={url} alt="img" className="w-full"/>
                </CardContent>
            </Card>
        </button>
        :
        <button onClick={() => ParseJson(jsonURL)}>
            <Card className=" overflow-hidden min-w-28 max-w-40">
                <CardContent className="p-0">
                    <img src={url} alt="img" className="w-full"/>
                </CardContent>
            </Card>
        </button>
    )
}

export default TemplateCard;