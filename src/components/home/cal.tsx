import Cal from "@calcom/embed-react";

export function CalComponent() {
  return (
    <Cal
      calLink="taylan/slm"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{
        theme: "light",
        layout: "month_view",
      }}
      calOrigin="https://cal.akord.agency"
      embedJsUrl="https://cal.akord.agency/embed/embed.js"
      className="mb-4 min-h-140"
    />
  );
}
