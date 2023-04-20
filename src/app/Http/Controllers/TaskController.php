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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
