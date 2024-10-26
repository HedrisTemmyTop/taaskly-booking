"use client";

import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Cancel from "../_icons/Cancel";
import { withdrawFunds } from "../_lib/booking";
import { ErrorResponse } from "../_types/user";
import formatToNaira from "../_utils/formatToNaira";
import BackDrop from "./BackDrop";
import Modal from "./Modal";
import ReusableInput from "./ReusableInput";
import { GreySpinner } from "./Spinner";

// Define Bank type
interface Bank {
  name: string;
  value: string;
  gateway: string | number;
}

// Props for Form Component
interface FormProps {
  setSelectedBank: (bank: Bank) => void;
  selectedBank: Bank;
  userBalance: number;
  setShowConfirm: (data: {
    accountName: string;
    accountNumber: number | null;
    amountDebited: number | null;
  }) => void;
}

// WithdrawBtn Component
export default function WithdrawBtn({ userBalance, data }) {
  const [modalState, setModalState] = useState<"form" | "confirm" | "">("");
  const [selectedBank, setSelectedBank] = useState<Bank>({
    name: "",
    value: "",
    gateway: "",
  });
  const [withdrawing, setWithdrawing] = useState(false);
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({});
  const isOpen = modalState === "form" || modalState === "confirm";

  const handleSelectedBank = (bank: Bank) => {
    setSelectedBank(bank);
  };
  const setShowConfirm = function (data) {
    setPaymentDetails(data);
    setModalState("confirm");
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload
    setWithdrawing(true); // Show loader
    const formData = new FormData(event.target); // Create FormData from form

    try {
      const response = await withdrawFunds(data, formData); // Call your server action

      if (!response.success) {
        throw new Error(response.message || "Withdrawal failed.");
      }

      setSuccess(`${response.message}`);
    } catch (error) {
      const err = error as ErrorResponse;
      setErr(`Error: ${err.message}`); // Show error message
    } finally {
      setModalState("");
      setWithdrawing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {err && (
        <Modal type="fail" message={err} handleCancel={() => setErr("")} />
      )}
      {success && (
        <Modal
          type="success"
          message={success}
          handleCancel={() => setSuccess("")}
        />
      )}

      <button
        type="button"
        className="text-secondary-400 w-full h-[46px] mt-3 border border-1 border-primary-400 rounded bg-purple-400"
        onClick={() => setModalState("form")}
      >
        Withdraw Money
      </button>
      <input type="hidden" name="bankName" value={selectedBank.name} />
      <input type="hidden" name="bankCode" value={selectedBank.value} />

      <BackDrop
        loading={withdrawing}
        isOpen={isOpen}
        onClose={() => setModalState("")}
      >
        <div className="flex w-full justify-between mb-6 items-center basis-full">
          <h2 className="text-2xl font-semibold">Bank Transfer</h2>
          <button
            type="button"
            onClick={() => setModalState("")}
            className="text-black border font-extralight border-primary-400 rounded text-4xl"
          >
            <Cancel />
          </button>
        </div>
        {modalState === "confirm" && (
          <Confirmation
            setModalState={setModalState}
            data={paymentDetails}
            pending={withdrawing}
          />
        )}
        {modalState === "form" && (
          <Form
            selectedBank={selectedBank}
            setSelectedBank={handleSelectedBank}
            userBalance={userBalance}
            setShowConfirm={setShowConfirm}
          />
        )}
      </BackDrop>
    </form>
  );
}

// Confirmation Component
const Confirmation = ({ data, setModalState, pending }) => {
  const gatewayFee =
    data.amountDebited !== null ? data.amountDebited * 0.02 : 0;
  const fee = formatToNaira(gatewayFee);
  const amountReceived = formatToNaira(data.amountDebited - gatewayFee);

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <input type="hidden" name="gatewayFee" value={gatewayFee} />
        <input
          type="hidden"
          name="amountReceived"
          value={data.amountDebited - gatewayFee}
        />
        <input type="hidden" name="accountNumber" value={data.accountNumber} />
        <input type="hidden" name="accountName" value={data.accountName} />

        <div className="w-full">
          <div className="font-medium mb-1">Amount Debited</div>
          <div>{formatToNaira(data.amountDebited)}</div>
        </div>
        <div className="w-full">
          <div className="font-medium mb-1">Payment Gateway Fee</div>
          <div>{fee}</div>
        </div>
        <div className="w-full">
          <div className="font-medium mb-1">Amount You will receive</div>
          <div>{amountReceived}</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-6 text-secondary-400 w-full">
        <button
          className="w-full bg-purple-400 rounded-lg h-12 border border-primary-400"
          onClick={() => {
            setModalState("form");
          }}
        >
          Back
        </button>
        <button
          type="submit"
          className="w-full disabled:bg-gray-400 bg-purple-400 rounded-lg h-12 border border-primary-400"
          disabled={pending}
        >
          {!pending ? "Send" : <GreySpinner />}
        </button>
      </div>
    </>
  );
};

const Form: React.FC<FormProps> = memo(
  ({ setSelectedBank, selectedBank, userBalance, setShowConfirm }) => {
    const [banks, setBanks] = useState<Bank[]>([]);
    const [filteredData, setFilteredData] = useState<Bank[]>([]);
    const [query, setQuery] = useState<string>("");
    const [dropdown, setShowDropdown] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [accountName, setAccountName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [accountNumber, setAccountNumber] = useState<number | null>(null);
    const [err, setErr] = useState<string>("");
    const [amountDebited, setAmountDebited] = useState<number | null>(null);

    const isValidAmount = useMemo(
      () =>
        amountDebited && amountDebited <= userBalance && amountDebited !== 0,
      [amountDebited, userBalance]
    );

    const isFormReady = useMemo(
      () => accountName && accountNumber && isValidAmount,
      [accountName, accountNumber, isValidAmount]
    );

    const handleSelect = useCallback(
      (bank: Bank) => {
        setQuery(bank.name);
        setShowDropdown(false);
        setSelectedBank(bank);
      },
      [setSelectedBank]
    );

    const handleSetAcctNo = useCallback(
      (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) => {
        if (e.target.value.length <= 11) {
          setAccountNumber(+e.target.value);
        }
      },
      []
    );

    const fetchBanks = useCallback(async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/get-banks");
        const data = await response.json();
        if (!response.ok || !data.data.status)
          throw new Error("Failed to fetch banks");

        const formattedBanks = data.data.data.map(
          (bank: { name: string; code: string; gateway: number | string }) => ({
            name: bank.name,
            value: bank.code,
            gatewayFee: bank.gateway,
          })
        );
        setBanks(formattedBanks);
        setFilteredData(formattedBanks);
      } catch (error) {
        console.error("Error fetching banks:", error);
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      if (!banks.length) fetchBanks();
    }, [fetchBanks, banks]);

    useEffect(() => {
      const filter = query
        ? banks.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
          )
        : banks;
      setFilteredData(filter);
    }, [query, banks]);

    useEffect(() => {
      const fetchUserFromPaystack = async () => {
        setIsLoading(true);
        try {
          console.log(selectedBank);
          const response = await fetch(
            `/api/get-bank-details?account_number=${accountNumber}&bank_code=${selectedBank.value}`
          );
          if (!response.ok) throw new Error(`Error: ${response.statusText}`);
          const data = await response.json();
          setAccountName(data.data.data.account_name);
        } catch (error) {
          setErr((error as ErrorResponse).message);
          setAccountName("");
        } finally {
          setIsLoading(false);
        }
      };

      if (String(accountNumber).length === 10 && selectedBank.value) {
        fetchUserFromPaystack();
      }
    }, [accountNumber, selectedBank]);

    return (
      <div className="flex flex-col gap-4 w-full">
        {err && (
          <Modal type="fail" message={err} handleCancel={() => setErr("")} />
        )}
        <div className="flex flex-col gap-1 w-full relative">
          <BankDropdown
            dropdown={dropdown}
            setQuery={setQuery}
            setDropdown={setShowDropdown}
            query={query}
            filteredData={filteredData}
            loading={loading}
            handleSelect={handleSelect}
          />
        </div>
        <ReusableInput
          name="accountNumber"
          placeholder="Enter an account number"
          onChange={handleSetAcctNo}
          label="Account Number"
          value={accountNumber || ""}
          type="number"
        />

        <div className="w-full relative">
          <ReusableInput
            name="accountName"
            label="Account Name"
            placeholder="Enter account name"
            value={isLoading ? "Loading..." : accountName}
            type="text"
            readOnly
          />
          {isLoading && (
            <span className="absolute top-1/2 right-4 z-2">
              <GreySpinner />
            </span>
          )}
        </div>
        <ReusableInput
          name="amountDebited"
          placeholder="#0.00"
          onChange={(e) => setAmountDebited(+e.target.value)}
          label="Account to send"
          value={amountDebited || ""}
          type="number"
        />
        <div className="w-full mt-4">
          <button
            className="text-secondary-400 bg-purple-400 w-full h-12 rounded-lg border border-primary-400 disabled:bg-gray-400"
            disabled={!isFormReady}
            onClick={() =>
              setShowConfirm({
                accountName,
                accountNumber,
                amountDebited,
              })
            }
          >
            Continue
          </button>
        </div>
      </div>
    );
  }
);

Form.displayName = "Form";

// export default Form;

// import React, { useEffect, useState } from 'react';

const BankDropdown = ({
  dropdown,
  setQuery,
  setDropdown,
  query,
  filteredData,
  loading,
  handleSelect,
}) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setDropdown(true)}
        className="border-[1.5px] outline-0 py-1 px-4 border-primary-400 rounded-lg text-inherit w-full h-12"
        placeholder="Search for a bank"
      />

      {dropdown && (
        <div className="rounded-lg absolute top-[105%] z-10 pt-2 pb-4 border border-primary-400 bg-secondary-400 w-full max-h-[400px] overflow-auto flex flex-col gap-1">
          {loading ? (
            <div className="px-4 py-2 text-gray-500">Loading...</div>
          ) : filteredData.length > 0 ? (
            filteredData.map((bank) => (
              <div
                key={`${bank.value}${bank.name}`}
                className="px-4 py-2 hover:bg-primary-400 hover:text-secondary-400 duration-100 cursor-pointer"
                onClick={() => handleSelect(bank)}
              >
                {bank.name}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};
