import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { CheckCircle2Icon, ClipboardListIcon } from 'lucide-react'
import { Link } from '@inertiajs/react'

export default function CheckoutSuccess() {
    return (
        <AppLayout>
            <div className="mx-auto max-w-2xl py-12 text-center">
                <div className="flex justify-center mb-6">
                    <div className="flex items-center justify-center size-16 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircle2Icon className="size-8" />
                    </div>
                </div>
                <h1 className="text-2xl font-semibold tracking-tight mb-2">
                    Payment successful
                </h1>
                <p className="text-sm text-muted-foreground mb-8">
                    Thank you for your purchase. Your order is now being processed.
                </p>

                <div className="flex items-center justify-center gap-3">
                    <Link href={`/orders`}>
                        <Button>
                            <ClipboardListIcon className="mr-2 size-4" />
                            View orders
                        </Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    )
}


