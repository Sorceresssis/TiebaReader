export const SCRAPE_INFO_SCHEMA = {
    "type": "object",
    "properties": {
        "main_thread": {
            "type": "integer"
        },
        "create_time": { "type": "integer" },
        "update_record": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "scraper_version": {
            "type": "string"
        }
    },
    "required": ["main_thread", "create_time", "scraper_version"]
}