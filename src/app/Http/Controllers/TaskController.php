<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     * 一覧表示処理
     */
    public function index()
    {
        $tasks = Task::all();
        return response($tasks, 200);
    }

    /**
     * Store a newly created resource in storage.
     * 追加処理
     */
    public function store(Request $request)
    {
        $task = Task::create($request->all());
        return response($task, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //これが原因で500エラーで初期データ取得できない
        // $task = Task::where('id', $id)->update(
        //     'title' => $request->title,
        // );
        // return response ($task, 200);

        $updatetarget = [ 'title' => $request->title,];
        $task = Task::where('id', $id)->update($updatetarget);
        return response ($task, 200);

        //例１
        // $post = Post::find($request->id);
        // $post->name = $request->name;
        // $post->content = $request->content;
        // $post->save();
        // $posts = Post::all();
        // return $posts;

        //例２
        // $update = [
        //     'title' => $request->title,
        //     'author' => $request->author
        // ];
        // $book = Book::where('id', $id)->update($update);
        // $books = Book::all();
        // if ($book) {
        //     return response()->json(
        //         $books
        //     , 200);
        // } else {
        //     return response()->json([
        //         'message' => 'Book not found',
        //     ], 404);
        // }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::where('id', $id)->delete();
        return response ($task, 200);
    }
}
