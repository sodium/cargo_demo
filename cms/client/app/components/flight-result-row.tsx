/*
    * Component to display a single flight result row with departure and arrival information. 
    * It takes in flight code, departure and arrival details, and overall status as props.
*/
interface FlightEndpointProps {
  time: string;
  location: string;
  status: string;
  aircraft: string;
}

interface FlightResultRowProps {
  flightCode: string;
  departure: FlightEndpointProps;
  arrival: FlightEndpointProps;
  overallStatus: string;
}

function formatTime(time?: string | null) {
     // assume time is in format "1959" or "2000+1"
    if(time == null) return ["", "", ""];

    const hour = time.slice(0, 2);
    const minute = time.slice(2, 4);
    const nextDay = time.slice(4,6);

    return [hour,minute, nextDay];

}

export function FlightResultRow({
  flightCode,
  departure,
  arrival,
  overallStatus,
}: FlightResultRowProps) {
    let filghtStatusText = "Scheduled";
    if(overallStatus === "Not_yet_departed"){
        filghtStatusText = "Scheduled";
    }
    else if(overallStatus === "Departed"){
        filghtStatusText = "Departed";
    }
    else if(overallStatus === "Arrived"){
        filghtStatusText = "Arrived";
    }
    else if(overallStatus === "Cancelled"){
        filghtStatusText = "Cancelled";
    }

    // Format departure and arrival times
    const [depHour, depMinute, depNextDay] = formatTime(departure.time);
    const [arrHour, arrMinute, arrNextDay] = formatTime(arrival.time);
    const formattedDepartureTime = `${depHour}:${depMinute}`;
    const formattedArrivalTime = `${arrHour}:${arrMinute}`;
    const displayNextDay = `${arrNextDay}`;


  return (
    <div className="mt-6 grid gap-0 md:grid-cols-[25%_50%_25%]">
      <div className="border border-slate-200 bg-white md:h-40 py-2 flex items-center justify-center text-lg text-slate-600">
        {flightCode}
      </div>
      <div className="border border-slate-200 bg-white h-40 p-2">
        <div className="grid h-full grid-cols-3 gap-0">
          <div className="flex items-center justify-center text-lg text-slate-600">
            <p className="text-center">
              <span className="text-green-800 text-lg font-bold">
                {formattedDepartureTime}
              </span>
              &nbsp;
              <span className="text-slate-800 text-lg">
                {departure.location}
              </span>
              <br />
              <span className="text-black bg-slate-100 px-2 py-0.5 my-3 text-xs inline-block">
                {filghtStatusText}
              </span>
              <br />
              <span className="text-slate-800 text-sm">
                {departure.aircraft}
              </span>
            </p>
          </div>
          <div className="flex items-start justify-center pt-6 text-sm text-slate-600">
            <img
              src="/result_plane_line.png"
              alt="Plane Icon"
              className="h-4 w-full object-contain mx-4"
            />
          </div>
          <div className="flex items-center justify-center text-lg text-slate-600">
            <p className="text-center">
              <span className="text-green-800 text-lg font-bold">
                {formattedArrivalTime}
                <sup>{displayNextDay}</sup>
              </span>
              &nbsp;
              <span className="text-slate-800 text-lg">
                {arrival.location}
              </span>
              <br />
              <span className="text-black bg-slate-100 px-2 py-0.5 my-3 text-xs inline-block">
                {filghtStatusText}
              </span>
              <br />
              <span className="text-slate-800 text-sm">
                {arrival.aircraft}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="border border-slate-200 bg-white md:h-40 py-2 flex items-center justify-center text-base font-bold text-slate-600">
        <ul className="list-disc text-green-800">
          <li>{filghtStatusText}</li>
        </ul>
      </div>
    </div>
  );
}
