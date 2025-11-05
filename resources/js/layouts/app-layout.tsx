import Footer from '@/components/footer';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import dashboard from '@/routes/dashboard/index';
import { Link } from '@inertiajs/react';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { ArrowLeftIcon, ChevronRightIcon, ShieldIcon, UserIcon, ReceiptIcon, BellIcon, CreditCardIcon, MapPinIcon, LogOut } from 'lucide-react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const [showMenuMobile, setShowMenuMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(min-width: 640px)');
        const update = () => setShowMenuMobile(!media.matches ? false : false);
        update();
        const listener = () => update();
        media.addEventListener?.('change', listener);
        return () => media.removeEventListener?.('change', listener);
    }, []);

    const menuItems = useMemo(
        () => [
            { title: 'My profile', href: dashboard.index().url, icon: UserIcon },
            { title: 'Orders', href: dashboard.orders().url, icon: ReceiptIcon },
            { title: 'Security', href: dashboard.security().url, icon: ShieldIcon },
        ],
        []
    );

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const isActive = (href: string) => currentPath.startsWith(href);

    return (
        <main className="w-full flex flex-col min-h-screen justify-between bg-blue-50/50">
            <Header />

            <div className='py-16'>
                <div className="py-8 sm:py-16"></div>

                {/* Mobile menu/content switcher */}
                <div className="sm:hidden max-w-2xl mx-auto px-5">
                    {/* Back button when in content view */}
                    {!showMenuMobile && (
                        <div className="mb-4">
                            <Button variant="ghost" onClick={() => setShowMenuMobile(true)} className="pl-0">
                                <ArrowLeftIcon className="mr-2 size-4" /> Back
                            </Button>
                        </div>
                    )}

                    {showMenuMobile ? (
                        <div className="space-y-4">
                            <div className="text-center">
                                <p className="text-xl font-semibold">My Account</p>
                                <p className="text-sm text-muted-foreground">Manage your profile and orders</p>
                            </div>

                            <div className="rounded-xl border divide-y">
                                {menuItems.map(({ title, href, icon: Icon }) => (
                                    <Link key={title} href={href} onClick={() => setShowMenuMobile(false)} className="block">
                                        <div className="flex items-center justify-between p-4" >
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center justify-center size-9 rounded-full bg-primary/10">
                                                    <Icon className="size-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-medium">{title}</span>
                                            </div>
                                            <ChevronRightIcon className="size-4 text-muted-foreground" />
                                        </div>
                                    </Link>
                                ))}
                                <Link onClick={() => setShowMenuMobile(false)} className="block">
                                        <div className="flex items-center justify-between p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center justify-center size-9 rounded-full bg-primary/10">
                                                    <LogOut className="size-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-medium">Logout</span>
                                            </div>
                                            <ChevronRightIcon className="size-4 text-muted-foreground" />
                                        </div>
                                    </Link>
                            </div>
                        </div>
                    ) : (
                        <div>{children}</div>
                    )}
                </div>

                {/* Desktop layout */}
                <div className="hidden sm:grid grid-cols-1 md:grid-cols-7 gap-4 max-w-7xl mx-auto px-5 sm:px-0">
                    <div className="flex flex-col gap-2 items-start">
                        <Link className='w-full' href={dashboard.index().url}>
                            <Button className='w-full justify-start ' variant={isActive(dashboard.index().url) ? 'default' : 'ghost'}>My Profile</Button>
                        </Link>
                        <Link className='w-full' href={dashboard.orders().url}>
                            <Button className='w-full justify-start' variant={isActive(dashboard.orders().url) ? 'default' : 'ghost'}>Orders</Button>
                        </Link>
                        <Link className='w-full' href={dashboard.security().url}>
                            <Button className='w-full justify-start' variant={isActive(dashboard.security().url) ? 'default' : 'ghost'}>Security</Button>
                        </Link>
                        <Button className='w-full justify-start' variant="ghost">Logout</Button>
                    </div>
                    <div className="col-span-6">{children}</div>
                </div>
            </div>
            <Footer />
        </main>
    );
};
