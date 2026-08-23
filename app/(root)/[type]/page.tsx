import React from "react";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Card from "@/components/Card";

const Page = async ({ params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";

  const files = await getFiles();
  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="capitalize h1">{type}</h1>

        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">0mb</span>
          </p>

          <div className="sort-container justify-self-end">
            <p className="body-1 hidden sm:block text-light-200 ">Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>

      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded.</p>
      )}
    </div>
  );
};
export default Page;
