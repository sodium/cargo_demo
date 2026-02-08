import { useState } from "react";
import { DatePicker } from "../components/date-picker";
import { FlightResultRow } from "../components/flight-result-row";



export function meta(/*{}: Route.MetaArgs */) {
  return [
    { title: "Home | React Router 7" },
    { name: "description", content: "Home Page" },
  ];
}

export default function FlightRoute() {
  const [selectedDate, setSelectedDate] = useState("");
  const [flightNo, setFlightNo] = useState("");
  const [flightStatus, setFlightStatus] = useState("Not_yet_departed");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<unknown>(null);
  const pageSize = 20;

  interface FlightResultItem {
    carrierCode?: string;
    flightNo?: string;
    origin?: string;
    destination?: string;
    departureTime?: string;
    arrivalTime?: string;
    flightStatus?: string;
    aircraftType?: string;
    aircraftCatg?: string;
  }

  const handleSearch = async () => {
    // Do Validation
    if (flightNo && !/^[A-Za-z]{2}\d{1,5}$/.test(flightNo)) {
      setError("Format error: use 2 letters followed by 1-5 digits (e.g., CX123).");
      return;
    }

    if (selectedDate && Number.isNaN(new Date(selectedDate).getTime())) {
      setError("Please select a valid date.");
      return;
    }

    if (
      ![
        "Not_yet_departed",
        "Departed",
        "Arrived",
        "Cancelled",
      ].includes(flightStatus)
    ) {
      setError("Please select a valid flight status.");
      return;
    }
    
    setIsLoading(true);
    setError("");
    setResult(null);
    setPage(1);
    try {
      // slice filghtCode into carrier code and flight number
      const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      const carrierCode = flightNo.slice(0, 2).toUpperCase();
      const flightNumber = flightNo.slice(2);
      
      // call /search-cargo
      const payload: {
        carrierCode?: string;
        flightNo?: string;
        flightStatus: string;
        flightDate: string;
      } = {
        flightStatus,
        flightDate: selectedDate
          ? new Date(selectedDate).toLocaleDateString("en-CA")
          : "",
      };

      if (carrierCode) {
        payload.carrierCode = carrierCode;
      }
      if (flightNo) {
        payload.flightNo = flightNumber;
      }

      const response = await fetch(`${apiBaseUrl}/api/search-cargo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    
      

      <main className="container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-1">
          <section id="flight_check_form">
            <h1 className="text-4xl">Check flight status</h1>
            <div className="mt-6 grid gap-0">
              <div className="border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap gap-2">
                  <button className="bg-white px-3 py-2 text-sm font-medium text-slate-700">
                    Search by flight number
                  </button>
                  <button className="bg-white px-3 py-2 text-sm font-medium text-slate-700">
                    Search by airport
                  </button>
                  <button className="bg-white px-3 py-2 text-sm font-medium text-slate-700">
                    Search by route
                  </button>
                </div>
              </div>
              <div className="border border-slate-200 bg-white p-4">
                 <p className="text-xs text-slate-500">Flight number</p>
                 
                  <input
                    type="text"
                    maxLength={10}
                    pattern="^[A-Za-z]{2}\d{1,5}$"
                    title="Use two to four letters followed by 1-10 digits (e.g., CX123)"
                    required={false}
                    aria-describedby="flight-number-error"
                    className="peer w-full py-1 focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-black-500 text-black"
                    placeholder="Enter your flight number"
                    value={flightNo}
                    onChange={(event) => setFlightNo(event.target.value)}
                  />
                  <p
                    id="flight-number-error"
                    className="mt-2 hidden text-xs text-red-600 peer-invalid:block py-0"
                  >
                    Format error: use 2-4 letters followed by 1-10 digits (e.g., CX123).
                  </p>
              </div>
              <div className="grid gap-0 md:grid-cols-2">
                <div className="border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">Status</p>
                  <select
                    className="mt-2 w-full  bg-white px-0 py-1 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-back-500"
                    value={flightStatus}
                    onChange={(event) => setFlightStatus(event.target.value)}
                  >
                    <option value="Not_yet_departed">Departing</option>
                    <option value="Departed">Departed</option>
                    <option value="Arrived">Arrived</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">Date</p>
                  <DatePicker 
                  value={selectedDate}
                  onChange={setSelectedDate}
                  placeholder="Select a date" />
                </div>
              </div>
              <div className="border border-slate-200 bg-white p-4">
                <button
                  className="w-full bg-black px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                  onClick={handleSearch}
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Search flights"}
                </button>
                {error ? (
                  <p className="mt-2 text-xs text-red-600">{error}</p>
                ) : null}
                {result ? (
                  <p className="mt-2 text-xs text-slate-600">
                    Results ready. See below.
                  </p>
                ) : null}
              </div>
            </div>
          </section>
        </div>
        <section id="search_result">
          {Array.isArray(result) && result.length > 0 ? (
            (() => {
              const totalPages = Math.max(1, Math.ceil(result.length / pageSize));
              const safePage = Math.min(page, totalPages);
              const startIndex = (safePage - 1) * pageSize;
              const pageItems = result.slice(startIndex, startIndex + pageSize);

              return (
                <>
                  <div className="flex items-center justify-between px-4 py-2 text-xs text-slate-600">
                    <span>
                      Showing {startIndex + 1}-
                      {Math.min(startIndex + pageSize, result.length)} of {result.length}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        className="border border-slate-200 px-2 py-1 disabled:opacity-50"
                        onClick={() => setPage((current) => Math.max(1, current - 1))}
                        disabled={safePage === 1}
                      >
                        Prev
                      </button>
                      <span>
                        Page {safePage} of {totalPages}
                      </span>
                      <button
                        className="border border-slate-200 px-2 py-1 disabled:opacity-50"
                        onClick={() =>
                          setPage((current) => Math.min(totalPages, current + 1))
                        }
                        disabled={safePage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  {pageItems.map((item, index) => {
                    const flight = item as FlightResultItem;
                    const flightCode = `${flight.carrierCode ?? ""}${
                      flight.flightNo ?? ""
                    }`;
                    const aircraft = [flight.aircraftCatg, flight.aircraftType]
                      .filter(Boolean)
                      .join(", ");

                    return (
                      <FlightResultRow
                        key={`${flightCode}-${startIndex + index}`}
                        flightCode={flightCode || "Unknown"}
                        departure={{
                          time: flight.departureTime ?? "--",
                          location: flight.origin ?? "---",
                          status: flight.flightStatus ?? "Unknown",
                          aircraft: aircraft || "Unknown",
                        }}
                        arrival={{
                          time: flight.arrivalTime ?? "--",
                          location: flight.destination ?? "---",
                          status: flight.flightStatus ?? "Unknown",
                          aircraft: aircraft || "Unknown",
                        }}
                        overallStatus={flight.flightStatus ?? "Unknown"}
                      />
                    );
                  })}
                </>
              );
            })()
          ) : (
            <p className="p-4 text-xs text-slate-400">No results yet.</p>
          )}
        </section>
      </main>
    </>
  );
}
