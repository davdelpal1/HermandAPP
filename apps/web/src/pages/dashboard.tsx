import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Panel de Control</h1>
            </header>
            <main className="dashboard-main">
                <section className="dashboard-section">
                    <h2>Estadísticas</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <h3>Usuarios</h3>
                            <p>120</p>
                        </div>
                        <div className="stat-card">
                            <h3>Eventos</h3>
                            <p>15</p>
                        </div>
                        <div className="stat-card">
                            <h3>Donaciones</h3>
                            <p>€1,200</p>
                        </div>
                    </div>
                </section>
                <section className="dashboard-section">
                    <h2>Últimos Movimientos</h2>
                    <ul className="movements-list">
                        <li>Juan Pérez realizó una donación de €50</li>
                        <li>Evento "Cena Benéfica" creado</li>
                        <li>María López se registró como usuario</li>
                    </ul>
                </section>
            </main>
            <footer className="dashboard-footer">
                <p>© 2023 HermandAPP</p>
            </footer>
        </div>
    );
};

export default Dashboard;