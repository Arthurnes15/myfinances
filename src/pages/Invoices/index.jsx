import { useEffect, useState } from 'react';
import { BsCreditCard2Front } from 'react-icons/bs';

import verifyUser from '../../hooks/verifyUser';
import Sidebar from '../../components/Common/Sidebar/index';
import Header from '../../components/Common/Header';
import Loading from '../../components/Loading';
import axiosClient from '../../config/axios';
import Invoice from '../../components/Invoice';
import ModalInstallments from '../../components/Modals/ModalsInvoices/ShowInstallments';
import Container from '../../components/Common/Container';
import './styles.css';

const Invoices = () => {
  verifyUser();
  const [isLoading, setIsLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [invoicesData, setInvoicesData] = useState([]);
  const [idInvoice, setIdInvoice] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const response = await axiosClient.get('invoices');
        setInvoices(response.data);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        console.log(error);
      }
    }

    getData();
  }, []);

  function openInvoice(invoice) {
    setIsOpen(true);
    setInvoicesData(invoice);
    setIdInvoice(invoice._id);
  }

  const { months } = invoicesData;

  return (
    <article>
      <ModalInstallments
        open={isOpen}
        close={() => setIsOpen(false)}
        setIsLoading={setIsLoading}
        months={months}
        idInvoice={idInvoice}
      />
      <Loading isLoading={isLoading} />
      <Sidebar />

      <Container>
        <Header icon={<BsCreditCard2Front size={35} />} title="Fatura" />

        <main className="all-invoices">
          {invoices.map((invoice, index) => (
            <Invoice
              key={index}
              item={invoice.item}
              status={invoice.status}
              installmentsValue={invoice.installmentsValue}
              onClick={() => openInvoice(invoice)}
            />
          ))}
        </main>
      </Container>
    </article>
  );
};

export default Invoices;
