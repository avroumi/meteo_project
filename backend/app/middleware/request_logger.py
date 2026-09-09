from fastapi import Request
import time


async def middleware_info(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    duration = time.perf_counter() - start
    print(
        f"{request.method} | url: {request.url} | status : {response.status_code} | duration: {duration:.3f}s"
    )
    return response
