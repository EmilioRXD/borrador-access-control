'use client';
import { useEffect } from 'react';
import './Main.css';
import Chart from 'chart.js/auto';

function Main() {
  useEffect(() => {
    // Inicializar los gráficos cuando el componente se monte
    const initCharts = () => {
      // Gráfico de tendencia de accesos semanales
      const weeklyAccessElement = document.getElementById('weeklyAccessChart');
      const weeklyAccessCtx = weeklyAccessElement instanceof HTMLCanvasElement ? weeklyAccessElement.getContext('2d') : null;
      if (weeklyAccessCtx) {
        new Chart(weeklyAccessCtx, {
          type: 'line',
          data: {
            labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            datasets: [{
              label: 'Semana Actual',
              data: [320, 345, 375, 390, 310, 150],
              backgroundColor: 'rgba(52, 152, 219, 0.2)',
              borderColor: '#3498db',
              borderWidth: 3,
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: '#3498db',
              pointBorderColor: '#3498db',
              pointBorderWidth: 0,
              fill: true
            }, {
              label: 'Semana Anterior',
              data: [290, 325, 360, 375, 290, 125],
              backgroundColor: 'rgba(155, 89, 182, 0.2)',
              borderColor: '#9b59b6',
              borderWidth: 3,
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: '#9b59b6',
              pointBorderColor: '#9b59b6',
              pointBorderWidth: 0,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              intersect: false,
              mode: 'index'
            },
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  usePointStyle: true,
                  padding: 15,
                  font: {
                    size: 12,
                    family: "'Poppins', sans-serif"
                  }
                }
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                cornerRadius: 8,
                boxPadding: 6,
                usePointStyle: true,
                titleFont: {
                  size: 14,
                  weight: 'bold',
                  family: "'Poppins', sans-serif"
                },
                bodyFont: {
                  size: 12,
                  family: "'Poppins', sans-serif"
                }
              }
            },
            scales: {
              x: {
                grid: {
                  display: false
                }
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(200, 200, 200, 0.2)'
                },
                title: {
                  display: true,
                  text: 'Cantidad de Estudiantes'
                }
              }
            }
          }
        });
      }

      // Gráfico de distribución de tipos de estudiantes
      const studentTypeElement = document.getElementById('studentTypeChart');
      const studentTypeCtx = studentTypeElement instanceof HTMLCanvasElement ? studentTypeElement.getContext('2d') : null;
      if (studentTypeCtx) {
        new Chart(studentTypeCtx, {
          type: 'doughnut',
          data: {
            labels: ['Regulares', 'Nuevo Ingreso', 'Reingreso', 'Especiales'],
            datasets: [{
              data: [65, 20, 10, 5],
              backgroundColor: [
                '#292d6b', // Color índigo para estudiantes regulares
                'rgba(46, 204, 113, 0.8)', // Verde para nuevo ingreso
                'rgba(52, 152, 219, 0.8)', // Azul para reingreso
                'rgba(155, 89, 182, 0.8)' // Morado para especiales
              ],
              borderColor: [
                '#292d6b',
                'rgba(46, 204, 113, 1)',
                'rgba(52, 152, 219, 1)',
                'rgba(155, 89, 182, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right',
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.label || '';
                    const value = context.raw || 0;
                    const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                    const percentage = Math.round((Number(value) / total) * 100);
                    return `${label}: ${percentage}% (${value} estudiantes)`;
                  }
                }
              }
            }
          }
        });
      }

      // Gráfico de accesos por hora
      const accessHoursElement = document.getElementById('accessHoursChart');
      const accessHoursCtx = accessHoursElement instanceof HTMLCanvasElement ? accessHoursElement.getContext('2d') : null;
      if (accessHoursCtx) {
        new Chart(accessHoursCtx, {
          type: 'bar',
          data: {
            labels: ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'],
            datasets: [{
              label: 'Entradas',
              data: [5, 45, 35, 25, 20, 30, 45, 15, 35, 30, 25, 20, 15, 10, 5],
              backgroundColor: 'rgba(52, 152, 219, 0.7)',
              borderColor: 'rgba(52, 152, 219, 1)',
              borderWidth: 1,
              borderRadius: 4
            }, {
              label: 'Salidas',
              data: [2, 5, 15, 20, 15, 25, 40, 40, 20, 25, 30, 35, 25, 15, 8],
              backgroundColor: 'rgba(231, 76, 60, 0.7)',
              borderColor: 'rgba(231, 76, 60, 1)',
              borderWidth: 1,
              borderRadius: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top'
              },
              tooltip: {
                mode: 'index',
                intersect: false
              }
            },
            scales: {
              x: {
                grid: {
                  display: false
                },
                title: {
                  display: true,
                  text: 'Hora del Día'
                }
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Cantidad de Estudiantes'
                },
                grid: {
                  color: 'rgba(200, 200, 200, 0.2)'
                }
              }
            }
          }
        });
      }

      // Gráfico de distribución por carreras
      const careerDistributionElement = document.getElementById('careerDistributionChart');
      const careerDistributionCtx = careerDistributionElement instanceof HTMLCanvasElement ? careerDistributionElement.getContext('2d') : null;
      if (careerDistributionCtx) {
        new Chart(careerDistributionCtx, {
          type: 'pie',
          data: {
            labels: ['Administración', 'Informática', 'Mercadeo', 'Contaduría', 'Turismo', 'Otras'],
            datasets: [{
              data: [30, 25, 15, 20, 5, 5],
              backgroundColor: [
                'rgba(52, 152, 219, 0.8)', // Azul
                'rgba(46, 204, 113, 0.8)', // Verde
                'rgba(155, 89, 182, 0.8)', // Morado
                'rgba(241, 196, 15, 0.8)', // Amarillo
                'rgba(230, 126, 34, 0.8)', // Naranja
                'rgba(149, 165, 166, 0.8)'  // Gris
              ],
              borderColor: [
                'rgba(52, 152, 219, 1)',
                'rgba(46, 204, 113, 1)',
                'rgba(155, 89, 182, 1)',
                'rgba(241, 196, 15, 1)',
                'rgba(230, 126, 34, 1)',
                'rgba(149, 165, 166, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right'
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.label || '';
                    const value = context.raw || 0;
                    const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                    const percentage = Math.round((Number(value) / total) * 100);
                    return `${label}: ${percentage}% (${value}%)`;
                  }
                }
              }
            }
          }
        });
      }
    };

    initCharts();

    // Limpiar los gráficos cuando el componente se desmonte
    return () => {
      Chart.getChart('weeklyAccessChart')?.destroy();
      Chart.getChart('studentTypeChart')?.destroy();
      Chart.getChart('accessHoursChart')?.destroy();
      Chart.getChart('careerDistributionChart')?.destroy();
    };
  }, []);

  return (
    <section className="home-section">
      <div className="header-container">
        <div className="text">Dashboard</div>
        <button className="menu-toggle-btn" id="menu-toggle">
          <i className='bx bx-menu'></i>
        </button>
      </div>

      {/* Contenedor principal del dashboard */}
      <div className="dashboard-container">
        {/* Fila superior de tarjetas de estadísticas */}
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon">
              <i className='bx bx-door-open'></i>
            </div>
            <div className="stat-info">
              <h3>Accesos Hoy</h3>
              <p className="stat-number">124</p>
              <p className="stat-change positive"><i className='bx bx-up-arrow-alt'></i> 8% vs. ayer</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className='bx bx-time'></i>
            </div>
            <div className="stat-info">
              <h3>Hora Pico</h3>
              <p className="stat-number">7:30 AM</p>
              <p className="stat-change">45 accesos</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className='bx bx-credit-card'></i>
            </div>
            <div className="stat-info">
              <h3>Tarjetas Activas</h3>
              <p className="stat-number">215</p>
              <p className="stat-change positive"><i className='bx bx-up-arrow-alt'></i> 5 nuevas este mes</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className='bx bx-error-circle'></i>
            </div>
            <div className="stat-info">
              <h3>Accesos Denegados</h3>
              <p className="stat-number">12</p>
              <p className="stat-change negative"><i className='bx bx-down-arrow-alt'></i> 3% este mes</p>
            </div>
          </div>
        </div>

        {/* Fila de gráficos */}
        <div className="charts-row">
          {/* Gráfico de tendencia de accesos semanales */}
          <div className="chart-container">
            <div className="chart-header">
              <h3>Tendencia de Accesos Semanales</h3>
              <div className="chart-actions">
                <button className="chart-action-btn"><i className='bx bx-refresh'></i></button>
                <button className="chart-action-btn"><i className='bx bx-dots-vertical-rounded'></i></button>
              </div>
            </div>
            <div className="chart-body">
              <canvas id="weeklyAccessChart"></canvas>
            </div>
          </div>

          {/* Gráfico de distribución de tipos de estudiantes */}
          <div className="chart-container">
            <div className="chart-header">
              <h3>Distribución por Tipo de Estudiante</h3>
              <div className="chart-actions">
                <button className="chart-action-btn"><i className='bx bx-refresh'></i></button>
                <button className="chart-action-btn"><i className='bx bx-dots-vertical-rounded'></i></button>
              </div>
            </div>
            <div className="chart-body">
              <canvas id="studentTypeChart"></canvas>
            </div>
          </div>
        </div>

        {/* Fila inferior de gráficos */}
        <div className="charts-row">
          {/* Gráfico de accesos por hora */}
          <div className="chart-container">
            <div className="chart-header">
              <h3>Accesos por Hora del Día</h3>
              <div className="chart-actions">
                <button className="chart-action-btn"><i className='bx bx-refresh'></i></button>
                <button className="chart-action-btn"><i className='bx bx-dots-vertical-rounded'></i></button>
              </div>
            </div>
            <div className="chart-body">
              <canvas id="accessHoursChart"></canvas>
            </div>
          </div>

          {/* Gráfico de distribución por carreras */}
          <div className="chart-container">
            <div className="chart-header">
              <h3>Distribución por Carreras</h3>
              <div className="chart-actions">
                <button className="chart-action-btn"><i className='bx bx-refresh'></i></button>
                <button className="chart-action-btn"><i className='bx bx-dots-vertical-rounded'></i></button>
              </div>
            </div>
            <div className="chart-body">
              <canvas id="careerDistributionChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;
