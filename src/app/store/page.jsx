import Link from "next/link";

export default function Store(){
    return (
            <div className="container">
                hello from Store page
                <p>
                    <Link href={'/'} className="mt-5" >Home</Link>
                </p>
               
            </div>
    );
}