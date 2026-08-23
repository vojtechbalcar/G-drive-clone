"use client";

import React from "react";
import { Models } from "node-appwrite";
import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "@/components/FormattedDateTime";
import ActionsDropdown from "@/components/ActionsDropdown";

const Card = ({
  file,
}: {
  file: Models.Document & {
    url: string;
    name: string;
    type: string;
    extension: string;
    size: number;
    bucketFileId: string;
    owner: Models.Document & { fullName: string };
  };
}) => {
  const handleCardClick = () => {
    window.open(file.url, "_blank");
  };

  return (
    <div
      onClick={handleCardClick}
      className="file-card cursor-pointer"
    >
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName="!size-18"
        />

        <div className="flex flex-col items-end justify-between">
          <div onClick={(e) => e.stopPropagation()}>
            <ActionsDropdown file={file} className="z-20" />
          </div>
          <p className="body-1">{convertFileSize(file.size)}</p>
        </div>
      </div>

      <div className="file-card-details">
        <p className="subtitle-2 line-clamp-1"> {file.name}</p>

        <FormattedDateTime
          date={file.$createdAt}
          className="body-2 text-light-100"
        />
        <p className="caption line-clamp-1 text-light-200">
          By : {file.owner.fullName}
        </p>
      </div>
    </div>
  );
};
export default Card;
