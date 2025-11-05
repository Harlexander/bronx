import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { ReceiptIcon, SearchIcon, EyeIcon, ChevronDownIcon } from 'lucide-react';
import { Table, TableBody, TableRow, TableCell, TableHeader, TableHead } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { OrderType, OrderItemType } from '@/types';
import { useState, useMemo } from 'react';

type StatusFilter = 'all' | 'successful' | 'failed' | 'processing';

const Orders = ({ orders }: { orders: OrderType[] }) => {
    console.log(orders);
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const filteredOrders = useMemo(() => {
        let filtered = orders;

        // Filter by status
        if (statusFilter !== 'all') {
            filtered = filtered.filter((order) => {
                const status = order.status.toLowerCase();
                if (statusFilter === 'successful') {
                    return status === 'completed' || status === 'delivered';
                }
                if (statusFilter === 'failed') {
                    return status === 'cancelled' || status === 'failed';
                }
                if (statusFilter === 'processing') {
                    return status === 'processing';
                }
                return true;
            });
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (order) =>
                    order.order_number.toLowerCase().includes(query) ||
                    order.items?.some((item: OrderItemType) =>
                        item.product?.name.toLowerCase().includes(query)
                    )
            );
        }

        return filtered;
    }, [orders, statusFilter, searchQuery]);

    const getStatusBadge = (status: string) => {
        const statusLower = status.toLowerCase();
        if (statusLower === 'completed' || statusLower === 'delivered') {
            return (
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Successful
                </Badge>
            );
        }
        if (statusLower === 'pending') {
            return (
                <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                    Pending
                </Badge>
            );
        }
        if (statusLower === 'processing') {
            return (
                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    Processing
                </Badge>
            );
        }
        if (statusLower === 'cancelled' || statusLower === 'failed') {
            return (
                <Badge className="bg-red-100 text-red-700  dark:bg-red-900/30 dark:text-red-400">
                    {statusLower === 'cancelled' ? 'Cancelled' : 'Failed'}
                </Badge>
            );
        }
        return (
            <Badge variant="outline">
                {status}
            </Badge>
        );
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const formatCurrency = (amount: string | number) => {
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
        }).format(numAmount);
    };

    const handleViewDetails = (order: OrderType) => {
        setSelectedOrder(order);
        setIsDialogOpen(true);
    };

    return (
        <AppLayout>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <div className="flex items-center justify-center size-10 bg-primary/10 rounded-full">
                                <ReceiptIcon className="size-4 text-primary" />
                            </div>
                            Receipt
                        </CardTitle>
                    </div>
                    <div className="flex items-center gap-4 mt-4 overflow-x-auto flex-col sm:flex-row">
                        <div className="flex items-center gap-2 flex-wrap">
                            {(['all', 'successful', 'failed', 'processing'] as StatusFilter[]).map((filter) => (
                                <Button
                                    key={filter}
                                    variant={statusFilter === filter ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setStatusFilter(filter)}
                                    className="capitalize"
                                >
                                    {filter === 'all' ? 'All' : filter}
                                </Button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                            <div className="relative">
                                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 w-full sm:w-64"
                                />
                            </div>
                            <Button variant="outline" size="sm">
                                Sort by <ChevronDownIcon className="ml-2 size-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table className='hidden sm:table'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Total cost</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                        No orders found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredOrders.map((order) => (
                                    <TableRow key={order.id} className="border-dotted border-b">
                                        <TableCell className="font-medium">
                                            {order.order_number}
                                        </TableCell>
                                        <TableCell>{formatDate(order.created_at)}</TableCell>
                                        <TableCell className="font-semibold">
                                            {(order.total)}
                                        </TableCell>
                                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleViewDetails(order)}
                                            >
                                                <EyeIcon className="mr-2 size-4" />
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    {/* Mobile list view */}
                    <div className="space-y-3 sm:hidden">
                        {filteredOrders.length === 0 ? (
                            <div className="text-center py-8 text-sm text-muted-foreground">
                                No orders found
                            </div>
                        ) : (
                            filteredOrders.map((order) => (
                                <div
                                    key={order.id}
                                    onClick={() => handleViewDetails(order)}
                                    className="rounded-lg border p-4 bg-background flex justify-between"
                                >
                                    <div className="flex-col flex justify-between">
                                        <p className="font-medium truncate">{order.order_number}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {formatDate(order.created_at)}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-end justify-between gap-3">
                                        <p className="text-sm font-semibold">
                                            {(order.total)}
                                        </p>

                                        <div className="shrink-0">{getStatusBadge(order.status)}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                        <DialogDescription>
                            Order #{selectedOrder?.order_number}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedOrder && (
                        <div className="space-y-6">
                            {/* Order Information */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Order Number</p>
                                    <p className="text-sm font-semibold">{selectedOrder.order_number}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Order Date</p>
                                    <p className="text-sm font-semibold">{formatDate(selectedOrder.created_at)}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                                    <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Payment Status</p>
                                    <p className="text-sm font-semibold">{selectedOrder.payment_status}</p>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="text-sm font-semibold mb-3">Order Items</h3>
                                <div className="space-y-3">
                                    {selectedOrder.items && selectedOrder.items.length > 0 ? (
                                        selectedOrder.items.map((item: OrderItemType) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center gap-4 p-3 border rounded-lg"
                                            >
                                                {item.product?.image && (
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            src={item.product.image}
                                                            alt={item.product.name || 'Product'}
                                                            className="w-16 h-16 object-cover rounded-md border"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = '/placeholder-product.png';
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium">{item.product?.name || 'Unknown Product'}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Quantity: {item.quantity} × {(item.price)}
                                                    </p>
                                                </div>
                                                <div className="flex-shrink-0 text-right">
                                                    <p className="font-semibold">{(item.total)}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No items found</p>
                                    )}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">{(selectedOrder.subtotal)}</span>
                                </div>
                                {parseFloat(selectedOrder.tax) > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Tax</span>
                                        <span className="font-medium">{(selectedOrder.tax)}</span>
                                    </div>
                                )}
                                {parseFloat(selectedOrder.shipping) > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="font-medium">{(selectedOrder.shipping)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                                    <span>Total</span>
                                    <span>{(selectedOrder.total)}</span>
                                </div>
                            </div>

                            {/* Delivery Address */}
                            {selectedOrder.delivery_address && (
                                <div>
                                    <h3 className="text-sm font-semibold mb-2">Delivery Address</h3>
                                    <p className="text-sm text-muted-foreground">{selectedOrder.delivery_address}</p>
                                </div>
                            )}

                            {/* Notes */}
                            {selectedOrder.notes && (
                                <div>
                                    <h3 className="text-sm font-semibold mb-2">Notes</h3>
                                    <p className="text-sm text-muted-foreground">{selectedOrder.notes}</p>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
};

export default Orders;
