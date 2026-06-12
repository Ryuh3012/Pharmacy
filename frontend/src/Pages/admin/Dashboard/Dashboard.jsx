import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Table, Pagination } from "@heroui/react";
import LayoutAdmin from '../../components/LayautAdmin';

// Registro de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Datos
  const transactions = [
    { id: "#TRX203", customer: "#C390", date: "20-12-25", items: "10", amount: "$150" },
    { id: "#TRX221", customer: "#C390", date: "27-10-25", items: "9", amount: "$108" },
    { id: "#TRX210", customer: "#C109", date: "25-10-25", items: "6", amount: "$240" },
    { id: "#TRX190", customer: "#C028", date: "24-10-25", items: "14", amount: "$148" },
    { id: "#TRX199", customer: "#C190", date: "23-10-25", items: "8", amount: "$136" },
    { id: "#TRX297", customer: "#C315", date: "22-10-25", items: "12", amount: "$220" },
  ];

  // Lógica de Paginación
  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  const paginatedData = transactions.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const lineData = { labels: ['Jan', 'Feb', 'Mar', 'Apr'], datasets: [{ label: 'Sales', data: [20, 30, 32, 40], borderColor: '#4f46e5', tension: 0.4 }] };
  const doughnutData = { labels: ['E-Wallet', 'Debit Card'], datasets: [{ data: [400, 300], backgroundColor: ['#1e1b4b', '#4f46e5'] }] };
  const barData = { labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'], datasets: [{ label: 'Revenue', data: [1000, 1800, 1600, 2500, 2400, 3000, 3400], backgroundColor: '#4f46e5' }] };

  return (
    <LayoutAdmin>
      {/* Gráficas Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border"><h3 className="font-bold mb-4">Sales Performance</h3><div className="h-[250px]"><Line data={lineData} options={{ maintainAspectRatio: false }} /></div></div>
        <div className="bg-white p-6 rounded-2xl border"><h3 className="font-bold mb-4">Payment Methods</h3><div className="h-[250px]"><Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} /></div></div>
      </div>

      {/* Gráfica de Barras y Tabla Paginada */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border"><h3 className="font-bold mb-4">Revenue Performance</h3><div className="h-[300px]"><Bar data={barData} options={{ maintainAspectRatio: false }} /></div></div>
        <div className="bg-white p-6 rounded-2xl border">
          <h3 className="font-bold mb-4">Top Transaction</h3>
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="Transactions" className="min-w-[400px]">
                <Table.Header>
                  <Table.Column>ID</Table.Column><Table.Column>Customer</Table.Column>
                  <Table.Column>Date</Table.Column><Table.Column>Purchase</Table.Column>
                </Table.Header>
                <Table.Body>
                  {paginatedData.map((t, i) => (
                    <Table.Row key={i}>
                      <Table.Cell>{t.id}</Table.Cell><Table.Cell>{t.customer}</Table.Cell>
                      <Table.Cell>{t.date}</Table.Cell><Table.Cell className="font-bold">{t.amount}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
          
          <div className="mt-6 flex justify-center">
            <Pagination className="justify-center">
              <Pagination.Content>
                <Pagination.Item>
                  <Pagination.Previous isDisabled={page === 1} onPress={() => setPage(p => p - 1)}><Pagination.PreviousIcon /><span>Previous</span></Pagination.Previous>
                </Pagination.Item>
                {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
                  <Pagination.Item key={p}><Pagination.Link isActive={p === page} onPress={() => setPage(p)}>{p}</Pagination.Link></Pagination.Item>
                ))}
                <Pagination.Item>
                  <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage(p => p + 1)}><span>Next</span><Pagination.NextIcon /></Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default Dashboard;