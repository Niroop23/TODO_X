from django.shortcuts import render
from django.contrib.auth.hashers import make_password,check_password

from rest_framework.decorators import api_view
from rest_framework.response import Response

from apiApp.models import todo_data, user_credentials


# Create your views here.

#helper functions


@api_view(['POST'])
def login(request,format=None):
    username=request.data['username']
    password=request.data['password']

    try:
        user_get=user_credentials.objects.get(username=username)

    except:
        return Response(
            {
            'status': 'User not found',
            }
        )

    if(check_password(password,user_get.password)):
        return Response(
            {
            'status': 'Successfully logged in',
            }
        )
    else:
        return Response(
            {
            'status': 'Wrong credentials entered',
            }
        )


@api_view(['POST'])
def create_todo(request,format=None):
    title_inp=request.data['title']
    desc_inp=request.data['desc']
    
    status_inp='Ongoing'
    obj=todo_data(
        title=title_inp,
        desc=desc_inp,
        status=status_inp
    )
    obj.save()
    
    todo=todo_data.objects.exclude(status='Archived').all().values('id','title','desc','status')
    all=todo_data.objects.exclude(status='Archived').all().values().count()
    ongoing=todo_data.objects.filter(status='Ongoing').values().count()
    completed=todo_data.objects.filter(status='Completed').values().count()
    archived=todo_data.objects.filter(status='Archived').values().count()
    
    stat=[
        {
            "label": 'All',
            "value": all
        },
        {
            "label": 'Ongoing',
            "value": ongoing
        },
        {
            "label": 'Completed',
            "value": completed
        },
        {
            "label": 'Archived',
            "value": archived
        },
    ]
    
    return Response(
        {
        'status': 'Todo created successfully',
        'stats':stat,
        'todo':todo,
        }
    )

@api_view(['GET'])
def initial_call(request,format=None):
    
    all=todo_data.objects.exclude(status='Archived').all().values().count()
    ongoing=todo_data.objects.filter(status='Ongoing').values().count()
    completed=todo_data.objects.filter(status='Completed').values().count()
    archived=todo_data.objects.filter(status='Archived').values().count()
    
    stat=[
        {
            "label": 'All',
            "value": all
        },
        {
            "label": 'Ongoing',
            "value": ongoing
        },
        {
            "label": 'Completed',
            "value": completed
        },
        {
            "label": 'Archived',
            "value": archived
        },
    ]
    todo=todo_data.objects.exclude(status='Archived').all().values('id','title','desc','status')
    
    return Response(
        {
        'status': 'Success',
        'stats': stat,
        'todo': todo,
        }
    )
    
@api_view(['GET'])
def completed(request,format=None):
    
    all=todo_data.objects.exclude(status='Archived').all().values().count()
    ongoing=todo_data.objects.filter(status='Ongoing').values().count()
    completed=todo_data.objects.filter(status='Completed').values().count()
    archived=todo_data.objects.filter(status='Archived').values().count()
    
    stat=[
        {
            "label": 'All',
            "value": all
        },
        {
            "label": 'Ongoing',
            "value": ongoing
        },
        {
            "label": 'Completed',
            "value": completed
        },
        {
            "label": 'Archived',
            "value": archived
        },
    ]
    
    obj=todo_data.objects.filter(status='Completed').values('id','title','desc','status')
    
    
    return Response(
        {
        'status': 'Success',
        'stats': stat,
        'todo': obj,
        }
    )
    
@api_view(['GET'])
def ongoing(request,format=None):
    
    all=todo_data.objects.exclude(status='Archived').all().values().count()
    ongoing=todo_data.objects.filter(status='Ongoing').values().count()
    completed=todo_data.objects.filter(status='Completed').values().count()
    archived=todo_data.objects.filter(status='Archived').values().count()
    
    stat=[
        {
            "label": 'All',
            "value": all
        },
        {
            "label": 'Ongoing',
            "value": ongoing
        },
        {
            "label": 'Completed',
            "value": completed
        },
        {
            "label": 'Archived',
            "value": archived
        },
    ]
    
    obj=todo_data.objects.filter(status='Ongoing').values('id','title','desc','status')
    
    
    return Response(
        {
        'status': 'Success',
        'stats': stat,
        'todo': obj,
        }
    )
    
@api_view(['GET'])
def archived(request,format=None):
    
    all=todo_data.objects.exclude(status='Archived').all().values().count()
    ongoing=todo_data.objects.filter(status='Ongoing').values().count()
    completed=todo_data.objects.filter(status='Completed').values().count()
    archived=todo_data.objects.filter(status='Archived').values().count()
    
    stat=[
        {
            "label": 'All',
            "value": all
        },
        {
            "label": 'Ongoing',
            "value": ongoing
        },
        {
            "label": 'Completed',
            "value": completed
        },
        {
            "label": 'Archived',
            "value": archived
        },
    ]
    
    obj=todo_data.objects.filter(status='Archived').values('id','title','desc','status')
    
    
    return Response(
        {
        'status': 'Success',
        'stats': stat,
        'todo': obj,
        }
    )
    
    
@api_view(['POST'])
def complete_task(request,format=None):
    id_inp=request.data['id']
    
    obj=todo_data.objects.filter(id=id_inp).update(status='Completed')
    
    all=todo_data.objects.exclude(status='Archived').all().values().count()
    ongoing=todo_data.objects.filter(status='Ongoing').values().count()
    completed=todo_data.objects.filter(status='Completed').values().count()
    archived=todo_data.objects.filter(status='Archived').values().count()
    
    stat=[
        {
            "label": 'All',
            "value": all
        },
        {
            "label": 'Ongoing',
            "value": ongoing
        },
        {
            "label": 'Completed',
            "value": completed
        },
        {
            "label": 'Archived',
            "value": archived
        },
    ]
    todo=todo_data.objects.exclude(status='Archived').all().values('id','title','desc','status')
    
    return Response(
        {
        'status': 'Success',
        "stats": stat,
        'todo': todo,
        }
    )
    
@api_view(['POST'])
def archived_task(request,format=None):
    id_inp=request.data['id']
    
    obj=todo_data.objects.filter(id=id_inp).update(status='Archived')
    
    all=todo_data.objects.exclude(status='Archived').all().values().count()
    ongoing=todo_data.objects.filter(status='Ongoing').values().count()
    completed=todo_data.objects.filter(status='Completed').values().count()
    archived=todo_data.objects.filter(status='Archived').values().count()
    
    stat=[
        {
            "label": 'All',
            "value": all
        },
        {
            "label": 'Ongoing',
            "value": ongoing
        },
        {
            "label": 'Completed',
            "value": completed
        },
        {
            "label": 'Archived',
            "value": archived
        },
    ]
    todo=todo_data.objects.exclude(status='Archived').all().values('id','title','desc','status')
    
    return Response(
        {
        'status': 'Success',
        "stats": stat,
        'todo': todo,
        }
    )
    
@api_view(['DELETE'])
def delete_task(request,format=None):
    task_id=request.data['id']
    obj=todo_data.objects.filter(id=task_id).delete()    
    
    all=todo_data.objects.exclude(status='Archived').all().values().count()
    ongoing=todo_data.objects.filter(status='Ongoing').values().count()
    completed=todo_data.objects.filter(status='Completed').values().count()
    archived=todo_data.objects.filter(status='Archived').values().count()
    
    stat=[
        {
            "label": 'All',
            "value": all
        },
        {
            "label": 'Ongoing',
            "value": ongoing
        },
        {
            "label": 'Completed',
            "value": completed
        },
        {
            "label": 'Archived',
            "value": archived
        },
    ]
    todo=todo_data.objects.exclude(status='Archived').all().values('id','title','desc','status')
    
    return Response(
        {
        'status': 'Success',
        "stats": stat,
        'todo': todo,
        }
    )
    
@api_view(['PUT'])
def update_task(request,format=None):
    
    task_id=request.data['id']
    task_title=request.data['title']
    task_desc=request.data['desc']
    
    obj=todo_data.objects.filter(id=task_id).update(title=task_title,desc=task_desc)
    
    
    all=todo_data.objects.exclude(status='Archived').all().values().count()
    ongoing=todo_data.objects.filter(status='Ongoing').values().count()
    completed=todo_data.objects.filter(status='Completed').values().count()
    archived=todo_data.objects.filter(status='Archived').values().count()
    
    stat=[
        {
            "label": 'All',
            "value": all
        },
        {
            "label": 'Ongoing',
            "value": ongoing
        },
        {
            "label": 'Completed',
            "value": completed
        },
        {
            "label": 'Archived',
            "value": archived
        },
    ]
    todo=todo_data.objects.exclude(status='Archived').all().values('id','title','desc','status')
    
    return Response(
        {
        'status': 'Success',
        "stats": stat,
        'todo': todo,
        }
    )
    



@api_view(['POST'])
def create_user(request,format=None):
    user=request.data['username']
    pwd=request.data['password']
    
    enc_pwd=make_password(pwd)

  
    obj=user_credentials(
        username=user,
        password=enc_pwd
    )
    obj.save()

    return Response({"message":"User created successfully",
                     "user":user,
                     })