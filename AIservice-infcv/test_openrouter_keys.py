import os
import json
import sys
import time
from pathlib import Path

import requests

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

# Optional: load a .env.local nearby for convenience (simple parser, no extra deps)
def load_env_local(possible_paths):
    for p in possible_paths:
        try:
            path = Path(p)
            if path.exists():
                for line in path.read_text(encoding="utf-8", errors="ignore").splitlines():
                    line = line.strip()
                    if not line or line.startswith("#"):
                        continue
                    if "=" in line:
                        k, v = line.split("=", 1)
                        k = k.strip()
                        v = v.strip().strip('"').strip("'")
                        # don't override existing env
                        if k and (os.environ.get(k) is None):
                            os.environ[k] = v
        except Exception:
            continue

# Try to find a .env.local next to the project
here = Path.cwd()
candidates = [
    here / ".env",
    here.parent / ".env",
    Path(r"c:\Users\benda\Desktop\QuickCV\.env"),  # Project-specific fallback path
]
load_env_local(candidates)

def test_openrouter_key(name, api_key, model):
    """
    name: logical name (Vision, PDF_to_JSON, Arbitrage)
    api_key: the OpenRouter API key to use
    model: model id, e.g. 'openai/gpt-4o-mini' or 'deepseek/deepseek-chat-v3.1:free'
    """
    print(f"\n=== Testing {name} ===")
    if not api_key:
        print(f"[SKIP] No API key found for {name}. Set the env variable first.")
        return

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        # Optional but recommended by OpenRouter:
        # "HTTP-Referer": "http://localhost",
        # "X-Title": "QuickCV Key Test",
    }
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are a concise assistant."},
            {"role": "user", "content": "Reply with the single word: OK"},
        ],
        "max_tokens": 5,
    }

    try:
        resp = requests.post(OPENROUTER_URL, headers=headers, json=payload, timeout=30)
        status = resp.status_code
        print(f"HTTP {status}")
        # Try to decode JSON
        data = {}
        try:
            data = resp.json()
        except Exception:
            print("[ERROR] Response is not JSON:")
            print(resp.text[:500])
            return

        if status != 200:
            print("[ERROR] Non-200 response. Body:")
            print(json.dumps(data, ensure_ascii=False, indent=2)[:1000])
            return

        # Extract result
        content = (data.get("choices") or [{}])[0].get("message", {}).get("content", "")
        usage = data.get("usage", {})
        used_model = data.get("model") or model

        print(f"[OK] Model: {used_model}")
        print(f"Content: {content!r}")
        print(f"Usage: {usage}")

    except requests.RequestException as e:
        print(f"[ERROR] Request exception: {e}")

def main():
    # Read keys from env
    key_vision = os.environ.get("OPENROUTER_API_KEY_VISION")
    key_pdf = os.environ.get("OPENROUTER_API_KEY_PDF_TO_JSON")
    key_arb = os.environ.get("OPENROUTER_API_KEY_ARBITRAGE")

    # Read models with sensible defaults matching our app config
    model_vision = os.environ.get("OPENROUTER_VISION_MODEL", "openai/gpt-4o-mini")
    model_pdf = os.environ.get("OPENROUTER_PDF_TO_JSON_MODEL", "deepseek/deepseek-chat-v3.1:free")
    model_arb = os.environ.get("OPENROUTER_ARBITRAGE_MODEL", "deepseek/deepseek-chat-v3.1")

    print("OpenRouter keys test starting...")
    print(f"- Vision model: {model_vision}")
    print(f"- PDF_to_JSON model: {model_pdf}")
    print(f"- Arbitrage model: {model_arb}")

    # Note: We send tiny prompts (max_tokens=5) to minimize any paid usage.
    test_openrouter_key("Vision", key_vision, model_vision)
    test_openrouter_key("PDF_to_JSON", key_pdf, model_pdf)
    test_openrouter_key("Arbitrage", key_arb, model_arb)

    print("\nDone.")

if __name__ == "__main__":
    main()