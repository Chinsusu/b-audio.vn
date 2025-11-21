#!/usr/bin/env node
/* eslint-disable no-console */
// Configure Content Manager layout for Product: tidy the edit form in neat columns.

const path = require("path");
const strapiFactory = require("@strapi/strapi");

const UID = "api::product.product";

function buildConfig() {
  return {
    settings: {
      bulkable: true,
      filterable: true,
      searchable: true,
      pageSize: 10,
      mainField: "title",
    },
    // Explicit metadatas for read-only aggregates
    metadatas: {
      rating_avg: {
        edit: {
          label: "rating_avg",
          description: "Auto-calculated",
          editable: false,
          visible: true,
        },
        list: { label: "rating_avg", searchable: false, sortable: true },
      },
      rating_count: {
        edit: {
          label: "rating_count",
          description: "Auto-calculated",
          editable: false,
          visible: true,
        },
        list: { label: "rating_count", searchable: false, sortable: true },
      },
    },
    layouts: {
      list: [
        "title",
        "price",
        "power_watt",
        "battery_hours",
        "rating_avg",
        "rating_count",
      ],
      edit: [
        // Row 1: title + slug
        [
          { name: "title", size: 6 },
          { name: "slug", size: 6 },
        ],
        // Row 2: price + compare + power
        [
          { name: "price", size: 4 },
          { name: "compare_price", size: 4 },
          { name: "power_watt", size: 4 },
        ],
        // Row 3: battery + dimensions + weight + connectivity (1 line)
        [
          { name: "battery_hours", size: 3 },
          { name: "dimensions", size: 3 },
          { name: "weight", size: 3 },
          { name: "connectivity", size: 3 },
        ],
        // Row 4: category full width (or adjust later)
        [{ name: "category", size: 12 }],
        // Row 5: images full width
        [{ name: "images", size: 12 }],
        // Row 6: ratings (read-only aggregates)
        [
          { name: "rating_avg", size: 6 },
          { name: "rating_count", size: 6 },
        ],
        // Row 7: description
        [{ name: "description", size: 12 }],
      ],
      relations: ["category", "images"],
    },
  };
}

async function run() {
  process.chdir(path.join(__dirname, ".."));
  const app = await strapiFactory().load();
  try {
    const cfg = buildConfig();
    await app
      .plugin("content-manager")
      .service("content-types")
      .updateConfiguration(UID, cfg);
    console.log("✅ Updated Content Manager layout for", UID);
  } catch (e) {
    console.error("❌ Failed to update CM layout:", e.message || e);
    process.exitCode = 1;
  } finally {
    await app.destroy();
  }
}

run();
