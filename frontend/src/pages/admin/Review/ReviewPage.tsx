import React from "react";
import Spinner from "../../../components/layout/Spinner";
import { SERVER_ERROR_MSG } from "../../../components/utils/constants";
import { useGetAllReviewsQuery } from "../../../store/api/reviewApi";
import {
  ItemListReview as ItemList,
  TableHeader,
} from "../../../components/Admin/ItemList";

const ReviewPageAdmin = () => {
  const { data, isLoading, isError } = useGetAllReviewsQuery({});

  if (isLoading) {
    return (
      <main className="min-h-screen py-12 px-10 bg-brown-200 flex justify-center items-start">
        <Spinner />
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="min-h-screen py-12 px-10 bg-brown-200 flex justify-start items-start">
        <p className="text-2xl font-light">{SERVER_ERROR_MSG}</p>
      </main>
    );
  }

  return (
    <main className="bg-brown-200 min-h-screen py-12 px-10">
      <div className="bg-white rounded-lg p-5">
        <h1 className="text-xl font-medium uppercase">Review List</h1>
        <table className="min-w-full text-left rtl:text-right mt-6">
          <thead className="text-base text-gray-700 uppercase bg-gray-50 font-primary">
            <TableHeader
              headers={[
                "#",
                "USER",
                "COMMENT",
                "RATING",
                "PROPERTY",
                "ACTIONS",
              ]}
            />
          </thead>
          <tbody className="font-secondary">
            <ItemList items={data} />
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ReviewPageAdmin;
