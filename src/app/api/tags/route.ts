import { connectToDatabase } from "@/app/lib/connectDB";
import Tag from "@/app/Models/TagSchema";

import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { name, clerkUserId } = await req.json();
    await connectToDatabase();
    const tag = new Tag({ name, clerkUserId });
    const savedTag = await tag.save();
    return NextResponse.json({ tags: savedTag });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function GET(req: any) {
  try {
    const clerkId = req.nextUrl.searchParams.get("clerkId");
    await connectToDatabase();
    const tags = await Tag.find({ clerkUserId: clerkId });

    return NextResponse.json({ tags: tags });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function PUT(request: Request) {
  try {
    const { id, name } = await request.json();

    await connectToDatabase();
    const updatedTag = await Tag.findByIdAndUpdate(id, { name }, { new: true });

    if (!updatedTag) {
      console.log("Tag not found:", id);
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }
    
    return NextResponse.json(updatedTag);
  } catch (error) {
    console.error("Error updating tag:", error);
    return NextResponse.json(
      { error: "Failed to update tag" },
      { status: 500 }
    );
  }
}
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const tagId = url.searchParams.get("tagId");
    if (!tagId) {
      return NextResponse.json(
        { message: "tagId is required" },
        { status: 400 }
      );
    }
    const tagToDelete = await Tag.findOneAndDelete({ _id: tagId });
    if (!tagToDelete) {
      return NextResponse.json({ message: "tag not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "tag deleted successfully" });
  } catch (error) {
    console.error("Error deleting tag:", error);
    // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to delete tag" },
      { status: 500 }
    );
  }
}
