<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use App\Models\JobHistory;
use App\Http\Requests\StoreJobHistoryRequest;
use App\Http\Requests\UpdateJobHistoryRequest;

class JobHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return response()->json(JobHistory::all(), 200);
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
     * @param StoreJobHistoryRequest $request
     * @return Response
     */
    public function store(StoreJobHistoryRequest $request)
    {
        $jobHistory = JobHistory::create([
            'user_id' => $request->user_id,
            'company_name' => $request->company_name,
            'job_title' => $request->job_title,
            'description' => $request->description,
            'job_type_id' => $request->job_type_id,
            'start_salary' => $request->start_salary,
            'end_salary' => $request->end_salary,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);
        return response($jobHistory, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param JobHistory $jobHistory
     * @return Response
     */
    public function show(JobHistory $jobHistory)
    {
        return response()->json($jobHistory, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param JobHistory $jobHistory
     * @return Response
     */
    public function edit(JobHistory $jobHistory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateJobHistoryRequest $request
     * @param JobHistory $jobHistory
     * @return Response
     */
    public function update(UpdateJobHistoryRequest $request, JobHistory $jobHistory)
    {
        if(!$jobHistory) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $jobHistory->update([
            'user_id' => $request->user_id,
            'company_name' => $request->company_name,
            'job_title' => $request->job_title,
            'description' => $request->description,
            'job_type_id' => $request->job_type_id,
            'start_salary' => $request->start_salary,
            'end_salary' => $request->end_salary,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);
        return response()->json($jobHistory, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param JobHistory $jobHistory
     * @return Response
     */
    public function destroy(JobHistory $jobHistory)
    {
        if(!$jobHistory) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $record = $jobHistory->company_name . ' / ' . $jobHistory->job_title;
        $jobHistory->delete();
        return response()->json(['message' => 'Record `' . $record . '` was deleted successfully'], 200);
    }
}
