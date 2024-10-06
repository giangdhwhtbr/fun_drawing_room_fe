"use client";

import { Input, Tag, Typography } from "antd";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function RoomSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const _keywords = searchParams.get("keywords");
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = useCallback(() => {
    (async () => {
      setLoading(true);
      try {
        const resp = await fetch(`/api/rooms/search/${keywords}`);
        const data = await resp.json();
        setSuggestions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [keywords]);

  const debounceSetKeywords = useCallback(
    debounce((e) => setKeywords(e.target.value), 300),
    [setKeywords]
  );

  useEffect(() => {
    if (keywords.length >= 3) {
      handleSearch();
    } else {
      setSuggestions([]);
    }
  }, [keywords, handleSearch]);

  return (
    <div className="search-container w-[800px]">
      {!_keywords ? (
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <Input.Search
            size="large"
            placeholder="Enter keywords to search for the room..."
            loading={loading}
            onChange={debounceSetKeywords}
          />
        </div>
      ) : (
        <div className="flex flex-row gap-3">
          <Typography.Text strong>Filter By Keywords: </Typography.Text>
          <Tag closable onClose={() => router.push("/rooms")}>
            {_keywords}
          </Tag>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="suggestions-container absolute w-[800px] bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-10">
          <ul className="max-h-60 overflow-y-auto">
            {suggestions.map((item: Room) => (
              <a key={item.id} href={`/rooms?keywords=${item.name}`}>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  {item.name}
                </li>
              </a>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
