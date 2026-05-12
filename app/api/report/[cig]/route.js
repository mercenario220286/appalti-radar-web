import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  let browser = null;

  try {
    const params = await context.params;
    const cig = String(params.cig || "").trim().toUpperCase();

    if (!cig) {
      return NextResponse.json(
        { ok: false, error: "CIG mancante" },
        { status: 400 }
      );
    }

    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") || host.includes("192.168.")
      ? "http"
      : "https";

    const baseUrl = protocol + "://" + host;
    const pageUrl = baseUrl + "/gara/" + encodeURIComponent(cig) + "?print=1";

    const fileName = "report_" + cig + ".pdf";
    const publicDir = path.join(process.cwd(), "public");
    const filePath = path.join(publicDir, fileName);
    const publicUrl = "/" + fileName;

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage"
      ]
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 3
    });

    await page.goto(pageUrl, {
      waitUntil: "networkidle0",
      timeout: 90000
    });

    await page.evaluate(() => {
      document.body.style.margin = "0";
      document.body.style.background = "#000000";
      document.documentElement.style.background = "#000000";
    });

    await page.pdf({
      path: filePath,
      width: "1920px",
      height: "1080px",
      landscape: true,
      printBackground: true,
      margin: {
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px"
      },
      preferCSSPageSize: false
    });

    await browser.close();
    browser = null;

    return NextResponse.redirect(new URL(publicUrl, baseUrl));
  } catch (error) {
    if (browser) {
      await browser.close();
    }

    return NextResponse.json(
      {
        ok: false,
        error: String(error)
      },
      { status: 500 }
    );
  }
}