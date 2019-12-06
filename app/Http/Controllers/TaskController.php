<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //Como le envia el indice de paginacion? Esta en el request pero como se indica?
        $tasks = Task::orderBy('id','ASC')->paginate(2);

        //return $tasks;
        return [
            'pagination' => [
                'total'        => $tasks->total(),
                'current_page' => $tasks->currentPage(),
                'per_page'     => $tasks->perPage(),
                'last_page'    => $tasks->lastPage(),
                'from'         => $tasks->firstItem(),
                'to'           => $tasks->lastItem()
            ],
            'tasks' => $tasks
        ];
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'keep' => 'required'
        ]);

        Task::create($request->all());

        return; //Javascript entregara el mensaje
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'keep' => 'required'
        ]);

        $task = Task::find($id)->update($request->all());

        return;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tasks = Task::findOrFail($id);
        $tasks->delete();
    }
}
