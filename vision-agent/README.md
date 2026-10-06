# AI Teacher (Vision Agents)

A voice-only AI language teacher that joins the app's Stream audio calls. It uses a realtime voice LLM and Stream Edge for transport.

The LLM is picked with `TEACHER_LLM` in `vision-agent/.env` (see `.env.example`):

- `gemini` (default): Gemini Live, needs `GOOGLE_API_KEY` from [Google AI Studio](https://aistudio.google.com/apikey). It has a free tier.
- `openai`: OpenAI Realtime, needs `OPENAI_API_KEY` and API credit.

The Stream keys (`STREAM_API_KEY`, `STREAM_API_SECRET`) come from the repo's root `.env`.

The teacher always speaks English. When it joins, it reads the lesson the Expo API stored in the call's custom data (`languageName`, `lessonTitle`, `goal`, `vocabulary`, `phrases`, `aiTeacher`) and builds its instructions from it. Without a language it falls back to `TEACHER_DEFAULT_LANGUAGE` (default `Spanish`).

The Expo API adds the agent user (`ai-teacher`) to each `audio_room` call with the `admin` role, because only hosts and admins can publish audio there.

## Run

```bash
cd vision-agent
uv sync
```

Start the HTTP server on http://127.0.0.1:8000 (`serve` is the default, so `uv run agent.py` works too):

```bash
uv run agent.py serve
curl http://127.0.0.1:8000/health
```

The teacher only joins when the app starts a lesson, so nothing opens in the browser. Avoid `uv run agent.py run`: it joins a separate test call and opens Stream's browser demo.

## Connecting to the app

The Audio Lesson screen starts and stops the teacher through the Expo API routes, which proxy to this server:

- `POST /api/agent/start` → `POST {VISION_AGENT_URL}/calls/{callId}/sessions`
- `POST /api/agent/stop` → `DELETE {VISION_AGENT_URL}/calls/{callId}/sessions/{sessionId}`

`VISION_AGENT_URL` goes in the root `.env` and defaults to `http://127.0.0.1:8000`. Keep `serve` running while you use the app.
