import DataLayout from "./Data"
import LinksLayout from "./Links"

function DashboardLayout(){
    return(
    <>
    <div className="main">
        <LinksLayout/>
        <DataLayout/>
    </div>
    </>
    )
}

export default DashboardLayout