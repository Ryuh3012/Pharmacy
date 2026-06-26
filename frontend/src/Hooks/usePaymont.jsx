import { useState, useMemo } from "react";

export const usePayment = (total) => {
    const [paymentMethod, setPaymentMethod] = useState('Pago Móvil');
    const [amountPaid, setAmountPaid] = useState("");
    const [reference, setReference] = useState("");
    const [cedula, setCedula] = useState("");

    const changeDue = useMemo(() => Math.max(0, Number(amountPaid) - total), [amountPaid, total]);

    const resetPayment = () => {
        setAmountPaid("");
        setReference("");
        setCedula("");
        setPaymentMethod('Pago Móvil');
    };

    return {
        paymentMethod, setPaymentMethod,
        amountPaid, setAmountPaid,
        reference, setReference,
        cedula, setCedula,
        changeDue, resetPayment
    };
};