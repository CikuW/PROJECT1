#!/usr/bin/env bash
gcloud config set project smaji-soft-launch
gcloud config set compute/zone us-west2-b


export PROJECT_ID="$(gcloud config get-value project -q)"
export CLUSTER=smaji-frontend-cluster
export ZONE=us-west2-b
export GCR_REGISTRY=gcr.io
export FRONTEND_DOCKER_IMAGE_NAME=frontend
export BACKEND_API_DOCKER_IMAGE_NAME=backend
export DATABASE_DOCKER_IMAGE_NAME=database
export SMAJI_DOCKER_IMAGE_NAME=smajifrontend


gcloud container clusters create $CLUSTER

cd frontend

docker build -t $GCR_REGISTRY/smaji-soft-launch/$FRONTEND_DOCKER_IMAGE_NAME:v1 -f docker/Dockerfile .

gcloud auth configure-docker
docker push $GCR_REGISTRY/smaji-soft-launch/$FRONTEND_DOCKER_IMAGE_NAME:v1

cd ../k8s-configurations
kubectl create -f services.yaml && kubectl create -f ingress.yaml && kubectl create -f deployments.yaml && kubectl create -f secrets.yaml

#helm
curl -o get_helm.sh https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get && chmod +x get_helm.sh && ./get_helm.sh && helm init

kubectl create serviceaccount --namespace kube-system tiller
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller

kubectl patch deploy tiller-deploy \
  --namespace kube-system \
  --patch '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}'

helm init --service-account tiller --upgrade

kubectl get deployments -n kube-system | grep tiller-deploy

helm install --name nginx-ingress stable/nginx-ingress --set rbac.create=true

kubectl get service nginx-ingress-controller

