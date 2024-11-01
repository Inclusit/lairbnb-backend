import PropertyList from "@/components/admin-comps/PropertyList";
import { Searchbar } from "@/components/Searchbar";


export default function PropertyPage() {
    return (
        <div>
            <div className="flex items-center justify-center w-full mt-7">
           <Searchbar />
            </div>
            <PropertyList />
        </div>
    );
}