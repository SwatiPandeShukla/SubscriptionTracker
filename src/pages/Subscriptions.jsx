import { useEffect, useMemo, useState } from "react";
import {
  createSubscription,
  deleteSubscription,
  getSubscriptions,
  updateSubscription,
} from "../api/subscriptionService";
import SubscriptionTable from "../components/subscriptions/SubscriptionTable";
import SubscriptionCard from "../components/subscriptions/SubscriptionCard";
import SubscriptionFilters from "../components/subscriptions/SubscriptionFilters";
import SubscriptionForm from "../components/subscriptions/SubscriptionForm";
import DeleteDialog from "../components/subscriptions/DeleteDialog";

function Subscriptions() {
const [subscriptions, setSubscriptions] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [showForm, setShowForm] = useState(false);
  const [editingSubscription, setEditingSubscription] =
  useState(null);
  const [deletingSubscription, setDeletingSubscription] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [billingCycle, setBillingCycle] = useState("All");
  const handleResetFilters = () => {
  setSearchTerm("");
  setCategory("All");
  setStatus("All");
  setBillingCycle("All");
  setSortBy("name");
  setCurrentPage(1);
};

  useEffect(() => {
  const loadSubscriptions = async () => {
    try {
      const data = await getSubscriptions();
      setSubscriptions(data);
    } catch (error) {
      setError(
        error.message ||
          "Something went wrong while loading subscriptions."
      );
    } finally {
      setLoading(false);
    }
  };

  loadSubscriptions();
}, []);

  const filteredSubscriptions = useMemo(() => {
    const result = subscriptions.filter((subscription) => {
      const matchesSearch =
        subscription.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        subscription.category
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        category === "All" ||
        subscription.category === category;

      const matchesStatus =
        status === "All" ||
        subscription.status === status;
      
      const matchesBillingCycle =
        billingCycle === "All" ||
  subscription.billingCycle === billingCycle;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&  
        matchesBillingCycle
      );
    });

    return [...result].sort((a, b) => {
      if (sortBy === "price-low") {
        return a.price - b.price;
      }

      if (sortBy === "price-high") {
        return b.price - a.price;
      }

      if (sortBy === "next-payment") {
        return (
          new Date(a.nextPayment) -
          new Date(b.nextPayment)
        );
      }

      return a.name.localeCompare(b.name);
    });
  }, [subscriptions, searchTerm, category, status, sortBy, billingCycle]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSubscriptions.length / itemsPerPage)
  );
  const pageToShow = Math.min(currentPage, totalPages);
  const paginatedSubscriptions = filteredSubscriptions.slice(
    (pageToShow - 1) * itemsPerPage,
    pageToShow * itemsPerPage
  );

  const handleEdit = (subscription) => {
  setEditingSubscription(subscription);
  setShowForm(true);
};
  const handleSave = async (subscriptionData) => {
  if (editingSubscription) {
    const updatedSubscription = await updateSubscription(
      editingSubscription.id,
      subscriptionData
    );

    setSubscriptions((currentSubscriptions) =>
      currentSubscriptions.map((subscription) =>
        subscription.id === editingSubscription.id
          ? updatedSubscription
          : subscription
      )
    );
  } else {
    const newSubscription = await createSubscription(
      subscriptionData
    );

    setSubscriptions((currentSubscriptions) => [
      ...currentSubscriptions,
      newSubscription,
    ]);
  }

  setShowForm(false);
  setEditingSubscription(null);
};

  const handleDelete = (subscription) => {
  setDeletingSubscription(subscription);
};

  const confirmDelete = async () => {
  if (!deletingSubscription) return;

  await deleteSubscription(deletingSubscription.id);

  setSubscriptions((currentSubscriptions) =>
    currentSubscriptions.filter(
      (item) => item.id !== deletingSubscription.id
    )
  );

  setDeletingSubscription(null);
};

const handleCancel = async (subscription) => {
  const updatedSubscription = await updateSubscription(
    subscription.id,
    { status: "Cancelled" }
  );

  setSubscriptions((currentSubscriptions) =>
    currentSubscriptions.map((item) =>
      item.id === subscription.id
        ? updatedSubscription
        : item
    )
  );
};

  if (loading) {
    return (
      <section>
        <p className="text-slate-500">
          Loading subscriptions...
        </p>
      </section>
    );
  }
  if (error) {
  return (
    <section>
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
        <h2 className="text-lg font-semibold text-red-800">
          Unable to load subscriptions
        </h2>

        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      </div>
    </section>
  );
}
  return (
    <section>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Manage
          </p>

          <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Subscriptions
          </h2>

          <p className="mt-2 text-slate-500">
            View and manage all your recurring subscriptions.
          </p>
        </div>

        <button
  type="button"
  onClick={() => setShowForm(true)}
  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
>
  + Add subscription
        </button> 
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-8">
        <SubscriptionFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          category={category}
          setCategory={setCategory}
          status={status}
          setStatus={setStatus}
          billingCycle={billingCycle}
          setBillingCycle={setBillingCycle}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onReset={handleResetFilters}
        />
      </div>

      <div className="mt-6">
        <p className="mb-3 text-sm text-slate-500">
          Showing {filteredSubscriptions.length} of{" "}
          {subscriptions.length} subscriptions
        </p>

        {filteredSubscriptions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h3 className="font-semibold text-slate-900">
              No subscriptions found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <>
            <SubscriptionTable
              subscriptions={paginatedSubscriptions}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onCancel={handleCancel}
            />

            <div className="space-y-4 lg:hidden">
              {paginatedSubscriptions.map((subscription) => (
                <SubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onCancel={handleCancel}
                />
              ))}
            </div>
          </>
        )}
            </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <button
            type="button"
            onClick={() => setCurrentPage(pageToShow - 1)}
            disabled={pageToShow === 1}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <p className="text-sm text-slate-500">
            Page {pageToShow} of {totalPages}
          </p>

          <button
            type="button"
            onClick={() => setCurrentPage(pageToShow + 1)}
            disabled={pageToShow === totalPages}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.max(page - 1, 1))
            }
            disabled={currentPage === 1}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <p className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </p>

          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(page + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {showForm && (
  <SubscriptionForm
    initialData={editingSubscription}
    onClose={() => {
      setShowForm(false);
      setEditingSubscription(null);
    }}
    onSave={handleSave}
  />
)}

      {deletingSubscription && (
        <DeleteDialog
          subscription={deletingSubscription}
          onClose={() => setDeletingSubscription(null)}
          onConfirm={confirmDelete}
          deleting={false}
        />
      )}
    </section>
  );
}

export default Subscriptions;