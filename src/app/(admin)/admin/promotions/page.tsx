"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
    { name: "Dashboard", key: "dashboard" },
    { name: "Coupons", key: "coupons" },
    { name: "Users", key: "users" },
    { name: "Orders", key: "orders" }
];

export default function Promotions() {
    const [activeSection, setActiveSection] = useState("dashboard");

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 flex flex-col p-4">
                <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
                <nav>
                    {menuItems.map((item) => (
                        <Button
                            key={item.key}
                            variant={activeSection === item.key ? "default" : "ghost"}
                            className="w-full text-left mb-2"
                            onClick={() => setActiveSection(item.key)}
                        >
                            {item.name}
                        </Button>
                    ))}
                </nav>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6">
                {activeSection === "dashboard" && <Dashboard />}
                {activeSection === "coupons" && <Coupons />}
                {activeSection === "users" && <Users />}
                {activeSection === "orders" && <Orders />}
            </div>
        </div>
    );
}

/* Sections */
function Dashboard() {
    return <h2 className="text-2xl font-bold">Welcome to the Admin Dashboard</h2>;
}

export function Coupons() {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newCoupon, setNewCoupon] = useState({ code: "".toUpperCase(), usageLimit: "", discount: "", expiresAt: "" });
    const { toast } = useToast();

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        setLoading(true);
        const response = await fetch("/api/coupons");
        const data = await response.json();
        if (data.success) {
            setCoupons(data.coupons);
        } else {
            toast({
                variant: 'destructive',
                description: 'Failed to fetch coupons.'
            });
        }
        setLoading(false);
    };

    const handleCreateCoupon = async () => {
        setLoading(true);
        console.log('COupon: ', coupons)
        const response = await fetch("/api/coupons", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCoupon),
        });

        const data = await response.json();
        if (data.success) {
            setCoupons([...coupons, data.coupon]);
            setNewCoupon({ code: "", discount: "", expiresAt: "" });
            toast({description: "Coupon added successfully!"});
        } else {
            toast({
                variant: 'destructive',
                description: 'Failed to add coupon.'
            });
        }
        setLoading(false);
    };

    const handleDeleteCoupon = async (code: string) => {
        if (!confirm("Are you sure you want to delete this coupon?")) return;

        const response = await fetch("/api/coupons", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        });

        const data = await response.json();
        if (data.success) {
            setCoupons(coupons.filter((coupon) => coupon.code !== code));
            toast({description: "Coupon deleted."});
        } else {
            toast({
                variant: 'destructive',
                description: 'Failed to delete coupon.'
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 pb-10">
            <h1 className="text-2xl font-bold mb-4">Manage Coupons</h1>

            {/* Add Coupon Form */}
            <div className="border p-4 rounded-md mb-4">
                <h2 className="text-lg font-semibold">Add a New Coupon</h2>
                <Input
                    type="text"
                    placeholder="Coupon Code"
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                />
                <Input
                    type="number"
                    placeholder="Discount (%)"
                    value={newCoupon.discount}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                />
                <Input
                    type="number"
                    placeholder="Usage Limit"
                    value={newCoupon.usageLimit}
                    onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: e.target.value })}
                />
                <Input
                    type="date"
                    value={newCoupon.expiresAt}
                    onChange={(e) => setNewCoupon({ ...newCoupon, expiresAt: e.target.value })}
                />
                <Button onClick={handleCreateCoupon} disabled={loading} className="mt-2">
                    {loading ? "Adding..." : "Add Coupon"}
                </Button>
            </div>

            {/* Display Coupons */}
            <h2 className="text-lg font-semibold">Existing Coupons</h2>
            <div className="border p-4 rounded-md">
                {loading && <p>Loading coupons...</p>}
                {coupons.length === 0 && !loading && <p>No coupons available.</p>}
                {coupons.map((coupon) => (
                    <div key={coupon.code} className="border-b py-2 flex justify-between items-center">
                        <div>
                            <p><strong>Code:</strong> {coupon.code}</p>
                            <p><strong>Discount:</strong> {coupon.discount}%</p>
                            <p><strong>Usage Limit:</strong> {coupon.usageLimit || 'None'}</p>
                            <p><strong>Expires:</strong> {coupon.expiresAt || "No expiration"}</p>
                        </div>
                        <Button variant="destructive" onClick={() => handleDeleteCoupon(coupon.code)}>
                            Delete
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}


function Users() {
    return <h2 className="text-2xl font-bold">Manage Users</h2>;
}

function Orders() {
    return <h2 className="text-2xl font-bold">Manage Orders</h2>;
}
