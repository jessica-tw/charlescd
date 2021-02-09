import { Http } from '../core/integrations/interfaces/k8s-manifest.interface'

export interface RouteHookParams {
  controller?: Record<string, unknown>
  parent: {
    apiVersion: 'charlescd.io/v1'
    kind: 'CharlesRoutes'
    metadata: Record<string, unknown>
    spec: {
      circles: {
        components: {
          name: string
          tag: string
        }[]
        default: boolean
        id: string
      }[]
    }
  }
  children: RouteChildren
  finalizing: boolean
}

export interface RouteChildren {
  'VirtualService.networking.istio.io/v1beta1': ChildVirtualServiceSpec,
  'DestinationRule.networking.istio.io/v1beta1': ChildDestinationRuleSpec
}

export interface HookParams {
  controller: Record<string, unknown>
  parent: {
    apiVersion: 'charlescd.io/v1'
    kind: 'CharlesDeployment'
    metadata: Record<string, unknown>
    spec: {
      circleId: string
      deploymentId: string
      components: { chart: string, name: string, tag: string }[]
    }
  }
  children: {
    'Deployment.apps/v1': DeploymentSpec,
    'Service.v1': ServiceSpec
  }
  finalizing: boolean
}

export interface SpecMetadata {
  creationTimestamp: string
  generation?: number // only on deployment
  name: string
  namespace: string
  ownerReferences: unknown[]
  resourceVersion: string
  uid: string
  labels: {
    app: string
    circle_id: string
    deployment_id: string
    'controller-uid': string
    version?: string // only on deployment
    service?: string // only on service
  }
}

export interface SpecStatus {
  availableReplicas: number
  conditions: {
    lastTransitionTime: string
    lastUpdateTime: string
    message: string
    reason: string
    status: 'True' | 'False' // TODO: check if this can be other values
    type: 'Progressing' | 'Available'  // TODO: check if this can be other values
  }[]
  observedGeneration: number
  readyReplicas: number
  replicas: number
  updatedReplicas: number
}

export interface DeploymentSpec {
  [key: string]: {
    apiVersion: string
    kind: string
    metadata: SpecMetadata
    status: SpecStatus
    spec: unknown
  }
}

export interface ChildVirtualServiceSpec {
  [key: string]: VirtualServiceSpec
}

export interface VirtualServiceSpec {
    apiVersion: string
    kind: 'VirtualService'
    metadata: {
      name: string
      namespace: string
    }
    spec: {
      gateways: string[]
      hosts: string[]
      http: Http[]
    }
  }

export interface ChildDestinationRuleSpec {
  [key: string]: DestinationRuleSpec
}

export interface DestinationRuleSpec {
    apiVersion: string
    kind: 'DestinationRule'
    metadata: {
      name: string
      namespace: string
    }
    spec: {
      host: string
      subsets: {
        labels: {
          circleId: string
          component: string
          tag: string
        }
        name: string
      }[]
    }
  }

export interface ServiceSpec {
  [key: string]: {
    apiVersion: string
    kind: string
    metadata: SpecMetadata
    spec: unknown
    status: {
      loadBalancer?: Record<string, unknown>
    }
  }
}
