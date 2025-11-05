import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { UserIcon, MailIcon, MapPinIcon, PhoneIcon, CalendarIcon, GlobeIcon } from 'lucide-react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { Transition } from '@headlessui/react';
import { Form, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    const address = typeof user.address === 'string' ? user.address : null;
    const phone = typeof user.phone === 'string' ? user.phone : null;
    const country = typeof user.country === 'string' ? user.country : null;
    const dob = typeof user.dob === 'string' ? user.dob : null;

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Profile Information Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <div className='flex items-center justify-center size-10 bg-primary/10 rounded-full'>
                                <UserIcon className="size-4 text-primary" />
                            </div>
                            Profile Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form
                            {...ProfileController.update.form()}
                            options={{
                                preserveScroll: true,
                            }}
                            className="space-y-6"
                        >
                            {({ processing, recentlySuccessful, errors }) => (
                                <>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name" className="flex items-center gap-2">
                                                <UserIcon className="size-4 text-muted-foreground" />
                                                Full Name
                                            </Label>
                                            <Input
                                                id="name"
                                                className="mt-1 block w-full"
                                                defaultValue={user.name}
                                                name="name"
                                                required
                                                autoComplete="name"
                                                placeholder="Full name"
                                            />
                                            <InputError
                                                className="mt-2"
                                                message={errors.name}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="email" className="flex items-center gap-2">
                                                <MailIcon className="size-4 text-muted-foreground" />
                                                Email Address
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                className="mt-1 block w-full"
                                                defaultValue={user.email}
                                                name="email"
                                                required
                                                autoComplete="username"
                                                placeholder="Email address"
                                            />
                                            <InputError
                                                className="mt-2"
                                                message={errors.email}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Button
                                            disabled={processing}
                                            data-test="update-profile-button"
                                        >
                                            Save Changes
                                        </Button>

                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-green-600 dark:text-green-400">
                                                ✓ Saved successfully
                                            </p>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                {/* Delivery Address Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <div className='flex items-center justify-center size-10 bg-primary/10 rounded-full'>
                                <MapPinIcon className="size-4 text-primary" />
                            </div>
                            Delivery Address
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {address ? (
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 p-4 border rounded-lg bg-muted/50">
                                        <MapPinIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div className="flex-1">
                                            <p className="font-medium text-sm text-muted-foreground mb-1">Default Address</p>
                                            <p className="text-sm">{address}</p>
                                            {country && (
                                                <div className="flex items-center gap-2 mt-2">
                                                    <GlobeIcon className="size-3.5 text-muted-foreground" />
                                                    <p className="text-xs text-muted-foreground">{country}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                                        Edit Address
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-center py-8 space-y-4">
                                    <div className="flex justify-center">
                                        <div className="flex items-center justify-center size-16 bg-muted rounded-full">
                                            <MapPinIcon className="size-8 text-muted-foreground" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm mb-1">No delivery address set</p>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Add a delivery address to speed up checkout
                                        </p>
                                        <Button variant="outline" size="sm">
                                            Add Delivery Address
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Information Card */}
                {(phone || dob || country) && (
                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <div className='flex items-center justify-center size-10 bg-primary/10 rounded-full'>
                                    <UserIcon className="size-4 text-primary" />
                                </div>
                                Additional Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                {phone && (
                                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                                        <PhoneIcon className="size-5 text-primary flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Phone Number</p>
                                            <p className="text-sm font-medium">{phone}</p>
                                        </div>
                                    </div>
                                )}
                                
                                {dob && (
                                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                                        <CalendarIcon className="size-5 text-primary flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Date of Birth</p>
                                            <p className="text-sm font-medium">
                                                {new Date(dob).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {country && (
                                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                                        <GlobeIcon className="size-5 text-primary flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Country</p>
                                            <p className="text-sm font-medium">{country}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    )
}
