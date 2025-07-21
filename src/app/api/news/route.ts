import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const newsApiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${newsApiKey}`;

  try {
    const response = await axios.get(apiUrl);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching news from proxy", error },
      { status: 500 }
    );
  }
}
