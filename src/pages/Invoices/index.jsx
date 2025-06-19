import { useEffect, useState } from 'react';
import { BsCreditCard2Front } from 'react-icons/bs';

import useVerifyUser from '../../hooks/useVerifyUser';
import Sidebar from '../../components/Common/Sidebar/index';
import BottomBar from '../../components/Common/BottomBar';
import Header from '../../components/Common/Header';
import Loading from '../../components/Loading';
import axiosClient from '../../config/axios';
import Invoice from '../../components/Invoice';
import ModalInstallments from '../../components/Modals/ModalsInvoices/ShowInstallments';
import ModalRegister from '../../components/Modals/ModalsInvoices/RegiterInvoice';
import Container from '../../components/Common/Container';
import HeaderMobile from '../../components/Common/HeaderMobile';
import './styles.css';

const Invoices = () => {
  useVerifyUser();
  const [isLoading, setIsLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [invoicesData, setInvoicesData] = useState([]);
  const [idInvoice, setIdInvoice] = useState('');
  const [isInstallmentsOpen, setIsInstallmentsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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
    setIsInstallmentsOpen(true);
    setInvoicesData(invoice);
    setIdInvoice(invoice._id);
  }

  const { months, restToPay } = invoicesData;

  return (
    <article>
      <ModalRegister
        open={isRegisterOpen}
        close={() => setIsRegisterOpen(false)}
        setIsLoading={setIsLoading}
      />
      <ModalInstallments
        open={isInstallmentsOpen}
        close={() => setIsInstallmentsOpen(false)}
        setIsLoading={setIsLoading}
        months={months}
        restToPay={restToPay}
        idInvoice={idInvoice}
      />

      <Loading isLoading={isLoading} />
      <Sidebar />
      <HeaderMobile />
      <BottomBar />

      <Container>
        <Header
          icon={<BsCreditCard2Front size={35} />}
          title="Fatura"
          onClick={() => setIsRegisterOpen(true)}
        />

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
