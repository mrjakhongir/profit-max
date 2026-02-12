import TransactionItem from "./item";

const TransactionsList = () => {
  return (
    <ul className="flex flex-col">
      <TransactionItem />
      <TransactionItem />
      <TransactionItem />
    </ul>
  );
};

export default TransactionsList;
