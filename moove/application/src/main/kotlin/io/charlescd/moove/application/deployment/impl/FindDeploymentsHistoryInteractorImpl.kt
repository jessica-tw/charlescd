package io.charlescd.moove.application.deployment.impl

import io.charlescd.moove.application.deployment.FindDeploymentsHistoryInteractor
import io.charlescd.moove.application.deployment.request.DeploymentHistoryFilterRequest
import io.charlescd.moove.application.deployment.response.SummarizedDeploymentHistoryResponse
import io.charlescd.moove.domain.PageRequest
import io.charlescd.moove.domain.repository.ComponentRepository
import io.charlescd.moove.domain.repository.DeploymentRepository
import javax.inject.Named

@Named
class FindDeploymentsHistoryInteractorImpl(
    private val componentRepository: ComponentRepository,
    private val deploymentRepository: DeploymentRepository
) : FindDeploymentsHistoryInteractor {

    override fun execute(workspaceId: String, filters: DeploymentHistoryFilterRequest, pageRequest: PageRequest): SummarizedDeploymentHistoryResponse {
        val pagedDeploymentsHistory = this.deploymentRepository.findDeploymentsHistory(workspaceId, filters.toDeploymentHistoryFilter(), pageRequest)

        val componentsMap = when (pagedDeploymentsHistory.content.isNotEmpty()) {
            true -> this.componentRepository.findComponentsAtDeployments(workspaceId, pagedDeploymentsHistory.content.map { it.id })
                .groupBy { it.deploymentId }
            false -> emptyMap()
        }

        TODO("Not yet implemented")
    }
}
