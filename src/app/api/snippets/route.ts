import { connectToDatabase } from "@/app/lib/connectDB";
import SingleSnippet from "@/app/Models/SnippetSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      clerkUserId,
      title,
      isImportant,
      tags,
      description,
      code,
      language,
      createdAt,
      isDeleted,
    } = await req.json();
    await connectToDatabase();
    const note = new SingleSnippet({
      clerkUserId,
      title,
      isImportant,
      tags,
      description,
      code,
      language,
      createdAt,
      isDeleted,
    });
    const savedNote = await note.save();
    console.log("faewfresfa", savedNote);

    return NextResponse.json(
      {
        notes: savedNote,
        message: "Note saved successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error saving note" }, { status: 400 });
  }
}
//generate the PUT method
export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const snippetId = url.searchParams.get("snippetId");
    console.log("response snippetId", snippetId);
    const { title, isImportant, tags, description, code, language, isDeleted } =
      await req.json();
    //console.log("response", req.json());

    await connectToDatabase();

    const updatedSnippet = await SingleSnippet.findByIdAndUpdate(
      snippetId,
      {
        title,
        isImportant,
        tags,
        description,
        code,
        language,
        isDeleted,
      },
      { new: true }
    );

    if (!updatedSnippet) {
      return NextResponse.json(
        { message: "Snippet not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        snippet: updatedSnippet,
        message: "Snippet updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating snippet:", error);
    return NextResponse.json(
      { message: "Error updating snippet" },
      { status: 400 }
    );
  }
}

export async function GET(req: any) {
  try {
    const clerkId = req.nextUrl.searchParams.get("clerkId");
    await connectToDatabase();
    const notes = await SingleSnippet.find({ clerkUserId: clerkId });
    return NextResponse.json({ notes: notes });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const snippetId = url.searchParams.get("snippetId");
    console.log("deletev snippet:", snippetId);

    if (!snippetId) {
      return NextResponse.json(
        { message: "snippetId is required" },
        { status: 400 }
      );
    }
    const snippetToDelete = await SingleSnippet.findOneAndDelete({
      _id: snippetId,
    });
    console.log("snippetToDelete snippet:", snippetToDelete);
    if (!snippetToDelete) {
      return NextResponse.json(
        { message: "Snippet not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Snippet deleted successfully" });
  } catch (error) {
    console.error("Error deleting snippet:", error);
    // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to delete snippet" },
      { status: 500 }
    );
  }
}
