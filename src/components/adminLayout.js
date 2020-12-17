import Navbar from '@/components/navbar'
import AdminNav from '@/components/adminNav'

const AdminLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
                    <div className="col-span-1">
                        <AdminNav />
                    </div>
                    <div className="col-span-4">{children}</div>
                </div>
            </div>
        </>
    )
}

export default AdminLayout
