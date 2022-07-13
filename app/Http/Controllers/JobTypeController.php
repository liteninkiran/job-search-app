<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use App\Models\JobType;
use App\Http\Requests\StoreJobTypeRequest;
use App\Http\Requests\UpdateJobTypeRequest;
use Illuminate\Database\QueryException;

class JobTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return response()->json(JobType::all(), 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreJobTypeRequest $request
     * @return Response
     */
    public function store(StoreJobTypeRequest $request)
    {
        $jobType = JobType::create([
            'slug' => $request->slug,
            'name' => $request->name,
        ]);
        return response($jobType, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param JobType $jobType
     * @return Response
     */
    public function show(JobType $jobType)
    {
        return response()->json($jobType, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param JobType $jobType
     * @return Response
     */
    public function edit(JobType $jobType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateJobTypeRequest $request
     * @param JobType $jobType
     * @return Response
     */
    public function update(UpdateJobTypeRequest $request, JobType $jobType)
    {
        if(!$jobType) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $jobType->update([
            'slug' => $request->slug,
            'name' => $request->name,
        ]);
        return response()->json($jobType, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param JobType $jobType
     * @return Response
     */
    public function destroy(JobType $jobType)
    {
        if(!$jobType) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $record = strtoupper($jobType->name);

        try {
            $jobType->delete();
        } catch(QueryException $e) {
            return response()->json([
                'message' => "Record could not be deleted:\n\n" . $record,
                'detail' => $e->getSql(),
            ], 500);
        }

        return response()->json(['message' => 'Record `' . $record . '` was deleted successfully'], 200);
    }
}
