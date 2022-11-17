# Build db app on OC
oc -n c0cce6-tools new-build https://github.com/alex-struk/markdown-flow/ --context-dir=db --name=mf-db

# retagging the image stream from latest to dev
oc -n c0cce6-tools tag mf-db:latest mf-db:dev

# deploy db
oc -n c0cce6-dev new-app c0cce6-tools/mf-db:dev --name=mf-db


# API APP
# build api app
oc -n c0cce6-tools new-build https://github.com/alex-struk/markdown-flow/ --context-dir=apiServer --name=markdown-flow-api --strategy=source

# watch log
oc -n c0cce6-tools logs -f bc/markdown-flow-api

# retagging the image stream from latest to dev
oc -n c0cce6-tools tag markdown-flow-api:latest markdown-flow-api:dev

# deploy api app
oc -n c0cce6-dev new-app c0cce6-tools/markdown-flow-api:dev --name=markdown-flow-api

# create http route. Todo: make https?
oc -n c0cce6-dev expose svc/markdown-flow-api

# to create https route:
oc -n c0cce6-dev create route edge markdown-flow-api --service=markdown-flow-api --insecure-policy=Redirect

# create replicata set for the databases (https://kubernetes.io/docs/tasks/run-application/run-replicated-stateful-application/)

# create configmap
oc apply -f mysql-configmap.yaml

# create services
oc apply -f mysql-services.yaml

# Create the StatefulSet
oc apply -f mysql-statefulset.yaml

# watch progress
oc get pods -l app=mf-db --watch

# run debug pod

kubectl run temporary --image=radial/busyboxplus:curl -i --tty

