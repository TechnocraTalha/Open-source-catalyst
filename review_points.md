# Review Points & Self-Assessment

## High-Volume Real-Time Updates
*   **Strategy**: Webhooks trigger immediate processing.
*   **Handling**: Redis Queue acts as a buffer. If 1000 webhooks arrive, they are queued and processed by workers at a controlled rate, preventing DB/Elasticsearch overload.

## API Rate Limit Handling
*   **Implementation**: `IngestionService` uses `firstValueFrom` with error handling.
*   **Improvement**: In a production environment, we would implement a `RateLimitInterceptor` or check `X-RateLimit-Remaining` headers before making requests, pausing the Queue if limits are low.

## Scalability Bottlenecks (v2.0)
1.  **Postgres Connections**: High concurrency might exhaust connections.
    *   *Fix*: Use PgBouncer.
2.  **Elasticsearch Indexing**: Heavy write load during initial ingestion.
    *   *Fix*: Bulk indexing API instead of single document indexing.
3.  **Monolithic Backend**: NestJS app handles API + Workers.
    *   *Fix*: Split into `api-service` and `worker-service` scaling independently.
