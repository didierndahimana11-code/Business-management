import React from 'react';
import { Save, Shield, User, Database, Globe } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Tabs from '../components/Tabs';

export default function Settings() {

    const GeneralTab = () => (
        <div className="dashboard-grid">
            <Card title="Business Profile">
                <form onSubmit={(e) => e.preventDefault()}>
                    <Input label="Company Name" defaultValue="My Business, Inc." />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <Input label="Email Address" type="email" defaultValue="admin@business.com" />
                        <Input label="Phone Number" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <Input label="Address" defaultValue="123 Business Street, Tech City, USA" />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <Input label="Currency" defaultValue="USD ($)" />
                        <Input label="Timezone" defaultValue="UTC-5 (EST)" />
                    </div>
                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="primary" icon={Save}>Save Changes</Button>
                    </div>
                </form>
            </Card>

            <Card title="Preferences">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 500 }}>Notifications</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Receive email alerts for low stock</div>
                        </div>
                        <input type="checkbox" defaultChecked />
                    </div>
                </div>
            </Card>
        </div>
    );

    const SecurityTab = () => (
        <Card title="Security Settings">
            <div style={{ maxWidth: '600px' }}>
                <Button variant="outline" icon={Shield}>Enable Two-Factor Authentication</Button>
                <div style={{ margin: '2rem 0', borderTop: '1px solid var(--color-border)' }}></div>
                <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Change Password</h3>
                <form onClick={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Input label="Current Password" type="password" />
                    <Input label="New Password" type="password" />
                    <Input label="Confirm New Password" type="password" />
                    <Button variant="primary" style={{ alignSelf: 'flex-start' }}>Update Password</Button>
                </form>
            </div>
        </Card>
    );

    const TeamTab = () => (
        <Card title="Team Management">
            <p>Manage users and roles here.</p>
        </Card>
    );

    const DataTab = () => (
        <Card title="Data Management">
            <div style={{ display: 'flex', gap: '1rem' }}>
                <Button variant="outline" icon={Database}>Backup Data</Button>
                <Button variant="outline" icon={Database} style={{ color: 'var(--color-error)', borderColor: 'var(--color-error)' }}>Reset Data</Button>
            </div>
        </Card>
    );

    const tabs = [
        { id: 'general', label: 'General', content: <GeneralTab /> },
        { id: 'security', label: 'Security', content: <SecurityTab /> },
        { id: 'team', label: 'Team', content: <TeamTab /> },
        { id: 'data', label: 'Data', content: <DataTab /> },
    ];

    return (
        <div className="container">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--spacing-6)' }}>Settings</h1>
            <Tabs tabs={tabs} />
        </div>
    );
}
