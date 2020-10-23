import app from "./app"

function main(){
    app.listen(app.get('port'));
    console.log("The server is running successfuly");
}
main();